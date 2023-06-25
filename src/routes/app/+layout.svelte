<script>
    import { goto } from "$app/navigation"
    import { refreshSession, supabase } from "../../lib/client";
    import { onMount } from "svelte";
    import Home from "$lib/assets/icons/home_filled.svelte"
    import { BottomNav, BottomNavItem } from "flowbite-svelte";

    let user;

    onMount(async () => {
        // Fix session, when user disconected it logout
        const {data, error} = await supabase.auth.getUser();
        if (!data?.user) {
            if (!(await refreshSession())) {
                goto("/")
                return
            }
        }

        user = data.user
    })

    // Move logic to +page.svelte
</script>

<div class="h-screen flex flex-col">
    <div class="flex-grow w-full">
        <slot></slot>
    </div>
    <BottomNav>
        <BottomNavItem btnName="Home">
            <Home />
        </BottomNavItem>
    </BottomNav>
</div>