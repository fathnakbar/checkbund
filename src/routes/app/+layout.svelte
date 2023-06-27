<script>
    import { goto } from "$app/navigation"
    import { refreshSession, supabase } from "../../lib/client";
    import { onMount } from "svelte";
    import Home from "$lib/assets/icons/home_filled.svelte"
    import Profile from "$lib/assets/icons/profile.svelte";

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

<slot></slot>
<!-- <div class="h-screen flex flex-col">
    <div class="flex-grow w-full" style="overflow-y: hidden;">
        <div class="h-full" style="overflow-y: scroll;">
            
        </div>
    </div>
    <div class="nav-bottom border-t p-3 flex justify-center items-center">
        <button>
            <Home class="w-7 h-7" />
        </button>
        <button>
            <Profile class="w-7 h-7" />
        </button>
    </div>
</div>

<style>
    .nav-bottom button {
        margin: 0 10%;
    }
</style> -->