<script>
  import { Button } from "flowbite-svelte";
  import Call from "$lib/assets/icons/call.svelte";

  export let name = "Ibu hamil";
  export let id = "1";
  export let address = "Bandung";
  export let contact = "081278596622";
</script>

<li class="py-3 my-3 w-full">
  <div class="flex items-center justify-between space-x-4 w-full">
    <div>
      <h3 class="font-bold text-sm">{name}</h3>
      <div class="text-gray-500 text-sm break-all">{address}</div>
    </div>
    <div class="flex items-center">
      <Button
        href={"tel:" + contact}
        size="xs"
        color="light"
        class="rounded-md w-9 h-9 mr-3"
        style="border-radius: 50%;"
      >
        <Call class="w-7 h-7 text-black" />
      </Button>
      <Button href="/app/bidan/catatan#{id}" size="xs" color="blue">catatan</Button>
    </div>
  </div>
</li>

<style>
  li {
    list-style: none;
  }
</style>
