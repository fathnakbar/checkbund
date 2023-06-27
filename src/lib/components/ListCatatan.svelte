<script>
    import { createEventDispatcher } from 'svelte';
  import LabledValue from './LabledValue.svelte';
  import Schedule from '../assets/icons/schedule.svelte';

    const dispatch = createEventDispatcher();

    export let item;

    function openDetail() {
        dispatch("detail", item)
    }
</script>

<div class="w-full p-3 border bg-blue-50 rounded-md my-3">
    <div class="text-sm mb-5 text-blue-500 flex items-center justify-between">
        <div class="flex items-center">
            <Schedule class="w-3 h-3 mr-1"/>
            Kembali pada 30 Juni 2023
        </div>
        <span class="text-gray-500">26 Juni 2023</span>

    </div>
    <div class="inline-flex">
        <div class="leading-snug">
            <span class="text-gray-500 text-sm">Tekanan darah:</span>
            <br>
            <span class="text-sm">120/80 mmHg</span>
        </div>
        <div class="mx-2"></div>
        <div class="leading-snug">
            <span class="text-gray-500 text-sm">Berat badan:</span>
            <br>
            <span class="text-sm">60 Kg</span>
        </div>
    </div>
    <div class="flex justify-between text-sm mt-5">
        <div class="text-gray-500">Dicatat bidan <b>Nita</b></div>
        <button class="text-blue-500 font-bold" on:click={openDetail}>lihat detail</button>
    </div>
</div>