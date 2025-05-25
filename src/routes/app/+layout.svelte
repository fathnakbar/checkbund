<script>
  import { onMount } from "svelte";
  import { guardian } from "$lib/client";
  import api from "$lib/sdk"
  import { goto } from "$app/navigation";

  onMount(async () => {
    guardian();
    const requestMyProfile = await api.getMyProfile()
    if(!requestMyProfile.success) {
        api.clearToken()
        await goto("/")
    }

  });
</script>

<slot />
