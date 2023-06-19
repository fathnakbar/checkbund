<script>
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/loading.svelte";
  import { onMount } from "svelte";
  import { getSession } from "../lib/client";
  import { Preferences } from "@capacitor/preferences";
  import { PREFERENCE_KEYS } from "../lib/client";

  onMount(async () => {
    const isLoggedIn = await getSession();

    console.log(isLoggedIn)
    if (isLoggedIn) {
      goto("/home");
    } else {
      // Check if the user has signup
      let { value: signup } = await Preferences.get({
        key: PREFERENCE_KEYS.HAS_SIGNUP,
      });
      signup = JSON.parse(signup);

      if (signup) {
        if (signup.confirmed) {
          goto("/confirmed");
        } else {
          goto("/wait_confirm");
        }
      } else {
        goto("/landing");
      }
    }
  });
</script>

<Loading />
