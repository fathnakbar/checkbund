<script>
  import { Button } from "flowbite-svelte";
  import { getUserData, guardian, supabase } from "../../lib/client";
  import { Preferences } from "@capacitor/preferences";
  import { goto } from "$app/navigation"
  import { onMount } from "svelte";
  import Loading from "../../lib/components/loading.svelte";
  import api from "$lib/sdk"

  let load = false;
 
  onMount(async () => {
    await guardian();

    const request = await api.getMyProfile()

    if (request.success) {
      goto("/app/" + request.data.role);
    }

    load = true;
  })



</script>

{#if !load}
  <Loading />
{/if}