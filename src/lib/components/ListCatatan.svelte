<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Schedule from "../assets/icons/schedule.svelte";
  import { useProps } from "../client";
  import { formatDate } from "../client";

  export let data_catatan;

  console.log(data_catatan)

  let notes = useProps(
    data_catatan.catatan ?? {},
    "nasihat,keluhan,hasil_pemeriksaan"
  );
  notes = Object.entries(notes);

  let amount = useProps(
    data_catatan.catatan ?? {},
    "tekanan_darah,berat_badan,lingkar_perut,metode_kontrasepsi,umur_kehamilan"
  );

  let show_detail;

  $: info = show_detail
    ? Object.entries(amount)
    : Object.entries(amount).slice(0, 2);

  function toggleDetail() {
    show_detail = !show_detail;
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
      {#each info as [key, value]}
        <div class="leading-snug mb-3">
          <span class="text-gray-500 text-sm"
            >{key[0].toUpperCase()}{key.slice(1).replace("_", " ")}</span
          >
          <br />
          <span class="text-sm">{value}</span>
        </div>
      {/each}
    {/if}
  </div>
  <div class="my-3"></div>
  {#if show_detail}
    {#each notes as [key, value]}
      <div class="my-5">
        <div class="mb-1 font-bold text-sm">
          {key[0].toUpperCase()}{key.slice(1).replace("_", " ")}
        </div>
        <p class="text-sm">{value ?? "Tidak ada"}</p>
      </div>
    {/each}
  {:else if notes.length > 0 && notes[0] != undefined && notes[0][1] != undefined}
    <div class="text-sm mb-1 font-bold">
      {((key) => `${key[0].toUpperCase()}${key.slice(1).replace("_", " ")}`)(
        notes[1][0]
      )}
    </div>
    <textarea rows="2" class="text-sm p-0 border-0 w-full" value={notes[1][1]} disabled/>
  {/if}

  <div class="flex justify-between text-sm mt-5">
    <div class="text-gray-500">
      Dicatat <b>{data_catatan?.user_data?.name}</b>
    </div>
    <button class="text-blue-500 font-bold" on:click={toggleDetail}
      >{!show_detail ? "lihat detail" : "sembunyikan"}</button
    >
  </div>
</div>
