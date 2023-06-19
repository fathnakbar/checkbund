<script>
  import { onMount } from "svelte";
  import "../lib/app.css";
  import { guardian } from "../lib/client";

  onMount(guardian);
</script>

<slot />
