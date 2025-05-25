<script>
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/loading.svelte";
  import { onMount } from "svelte";
  import api from "$lib/sdk"

  onMount(async () => {
    if (api.getToken()) {
      goto("/app");
    } else {
      goto("/landing")
    }
  });
</script>

<Loading />
