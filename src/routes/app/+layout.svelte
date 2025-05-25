<script>
    import { goto } from "$app/navigation"
    import { onMount } from "svelte";
    import { profile } from "$lib/store"
    import api from "$lib/sdk"

    onMount(async () => {
        // Fix session, when user disconected it logout
        
        const request = await api.getMyProfile()
        if (!request.success) {
            goto("/")
        }

        profile.set()
    })
</script>

<slot></slot>
