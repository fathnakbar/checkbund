<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import "../lib/app.css";
  import "https://fonts.googleapis.com/icon?family=Material+Icons";
  import { supabase } from "../lib/client";

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const path = new URL(window.location).pathname;

    if (user) {
        goto("/app")
        return
    }

    if (!user && !"/login,/register".includes(path)) {
      goto("/landing")
    }
  });
</script>

<slot />
