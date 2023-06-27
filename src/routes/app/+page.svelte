<script>
  import { Button } from "flowbite-svelte";
  import { PREFERENCE_KEYS, guardian, supabase } from "../../lib/client";
  import { Preferences } from "@capacitor/preferences";
  import { goto } from "$app/navigation"
  import { onMount } from "svelte";
  import Loading from "../../lib/components/loading.svelte";

  let load = false;
  let user_data;
  let error;

  onMount(async () => {
    await guardian();
    await hydration();

    if (user_data) {
      console.log(user_data)
      goto("/app/" + user_data.role);
    }

    load = true;
  })

  async function hydration(){
    let result = await Promise.allSettled(requests());

    let [user] = result;

    if (user.status == "fulfilled") {
      if (user.value.error) {
        return
      }

      user_data = user.value.data[0];   
    }
  }

  function requests() {
    return [supabase.from("user_data").select("*")]
  }




</script>

{#if !load}
  <Loading />
{/if}