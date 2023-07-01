<script>
  import { Button } from "flowbite-svelte";
  import { getUserData, guardian, supabase } from "../../lib/client";
  import { Preferences } from "@capacitor/preferences";
  import { goto } from "$app/navigation"
  import { onMount } from "svelte";
  import Loading from "../../lib/components/loading.svelte";

  let load = false;
  let user_data;
  let error;

  onMount(async () => {
    await guardian();

    user_data = (await getUserData()).data;

    console.dir(user_data)

    if (user_data) {
      goto("/app/" + user_data.role || "");
    }

    load = true;
  })



</script>

{#if !load}
  <Loading />
{/if}