<script>
  import { Button } from "flowbite-svelte";
  import { PREFERENCE_KEYS, getSession, guardian, supabase } from "../../lib/client";
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
    let result = await requests((await getSession()).user);

    if (result.data && result.data.length > 0) {
      if (result.error) {
        return
      }

      user_data = result.data[0];   
    }
  }

  function requests({id}) {
    return supabase.from("user_data").select("*").eq("id", id)
  }




</script>

{#if !load}
  <Loading />
{/if}