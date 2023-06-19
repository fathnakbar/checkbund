<script>
    import { goto } from "$app/navigation"
    import { refreshSession, supabase } from "../../lib/client";
    import { onMount } from "svelte";

    let user;

    onMount(async () => {
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


<div>
    {JSON.stringify(user)}
</div>

<slot></slot>