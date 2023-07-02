<script>
    import { Button } from "flowbite-svelte";
    import Schedule from "../assets/icons/schedule.svelte";
    import { calculateRemainingDays } from "../client";
    export let jadwal;
</script>


<div class="bg-blue-50 border w-full p-5 rounded-md mb-6">
    {#if !jadwal || jadwal.length == 0}
      <div class="text-center text-gray-500 text-sm">
        Anda belum memiliki jadwal temu
      </div>
    {:else}
      <div class="text-sm text-blue-500 flex items-center font-bold">
        <Schedule class="w-4 h-4 mr-1" />
        {jadwal.return_date}
      </div>
      <div class="my-5">
        <b>{jadwal.user_data.name}</b>
        <div class="text-sm text-gray-500">{jadwal.user_data.address}</div>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-500">{calculateRemainingDays(Date.now(), jadwal.return_date)} hari lagi</span>
        <Button size="xs" color="blue" href="tel:{jadwal.user_data.contact.phone}">Hubungi</Button>
      </div>
    {/if}
  </div>