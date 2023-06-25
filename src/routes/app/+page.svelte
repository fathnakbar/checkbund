<script>
  import { Button } from "flowbite-svelte";
  import { PREFERENCE_KEYS, supabase } from "../../lib/client";
  import { Preferences } from "@capacitor/preferences";
  import { goto } from "$app/navigation"
  import { onMount } from "svelte";

  onMount(() => {
    // goto("/app/home");
  })
  // async function signOut(params) {
  //   await supabase.auth.signOut()
  //   await Preferences.remove({
  //       key: PREFERENCE_KEYS.SESSION
  //   })

  //   goto("/")
  // }
</script>

<!-- <Button on:click={signOut}>Sign Out</Button> -->