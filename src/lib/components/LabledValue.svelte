<script>
  export let items;
</script>

<div class="flex justify-between items-start my-5">
  {#each items as item}
    <div>
      <span class="block text-gray-500">{item.label}</span>
      <span class="font-bold">{item.value}</span>
    </div>
  {/each}
</div>
