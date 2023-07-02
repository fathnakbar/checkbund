<script>
  import { createEventDispatcher, onMount } from "svelte";
  import LabledValue from "./LabledValue.svelte";
  import Schedule from "../assets/icons/schedule.svelte";
  import { useProps } from "../client";

  export let data_catatan;
  let amount;

  onMount(() => {
    amount = useProps(data_catatan?.catatan, "tekanan_darah,berat_badan,lingkar_perut,metode_kontrasepsi,umur_kehamilan")
  })

  let show_detail;


  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);

    console.log(data_catatan)

    return dateString ? formatter.format(date) : "Tidak tersedia";
  }

  function toggleDetail() {
    show_detail = !show_detail
  }
</script>

<div class="w-full p-3 border bg-blue-50 rounded-md my-3">
  <div class="text-sm mb-5 text-blue-500 flex items-center justify-between">
    <div class="flex items-center">
      <Schedule class="w-3 h-3 mr-1 mt-1" />
      {formatDate(data_catatan?.return_date)}
    </div>
    <span class="text-gray-500">{formatDate(data_catatan.created_at)}</span>
  </div>
  <div class="grid grid-cols-2">
    {#if amount}
    {#each Object.entries(amount) as [key, value]}
    <div class="leading-snug">
      <span class="text-gray-500 text-sm">Tekanan darah:</span>
      <br />
      <span class="text-sm">120/80 mmHg</span>
    </div>
  {/each}
    {/if}
  </div>
  <div class="flex justify-between text-sm mt-5">
    <div class="text-gray-500">Dicatat <b>{data_catatan?.user_data?.name}</b></div>
    <button class="text-blue-500 font-bold" on:click={toggleDetail}
      >lihat detail</button
    >
  </div>
</div>
