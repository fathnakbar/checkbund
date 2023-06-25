<script>
  import { Button } from "flowbite-svelte";
  import Call from "../../../../lib/assets/icons/call.svelte";
  import More from "../../../../lib/assets/icons/more.svelte";
  import Location from "../../../../lib/assets/icons/location.svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import Vital from "$lib/assets/icons/vital.svelte"
  import Scale from "../../../../lib/assets/icons/scale.svelte";
  import Stetoscope from "../../../../lib/assets/icons/stetoscope.svelte";
  import { onMount } from "svelte";
  import ListCatatanKesehatan from "../../../../lib/components/ListCatatanKesehatan.svelte";
  import ListCatatanNifas from "../../../../lib/components/ListCatatanNifas.svelte";

  let view_daftar = "nifas";

  let data_set = [1,2,3];

  onMount(() => {
    // guardian
    // for (let i = 0; i < 4; i++) {
    //     let item = daftar.children[0].cloneNode(true);
    //     daftar.appendChild(item);
    // }

    // Fetch to supabase for data list

  })

  function changeView(type) {
    return () => {
        view_daftar = type
    };
  }

    
</script>

<div class="w-full flex flex-col h-full p-5">
    <!-- <div class="mb-5 font-bold text-blue-500">
        Hallo, Bapak Lucky
    </div> -->
    <!-- <div class="text-xs font-bold mb-3">Klinik Anda</div> -->
    <div class="w-full flex justify-between mb-5">
        <div class="mb-3">
            <div class="text-base mb-1">Klinik Ibu Sehat</div>
            <span class="text-gray-500 text-sm flex items-center">
                <Location class="w-5 h-5 mr-1" />
                Alamat klinik
            </span>
        </div>
        <div class="flex items-center">
            <Button size="xs" color="blue" class="rounded-md w-9 h-9" style="border-radius: 50%;">
                <Call class="w-7 h-7 text-white"/>
            </Button>
            <div style="margin: 0 7px"></div>
            <button><More height="20px" width="20px"/></button>
        </div>
    </div>
    <!-- <div class="text-sm font-bold mb-3">Daftar Catatan</div> -->
    <div class="w-full flex items-center justify-center mb-6">
        <!-- <div class="usl border rounded-lg flex items-center justify-center p-3" style="width: 150px;height:80px">Catatan Kesehatan</div> -->
        <Button color="blue" style="width: 50%;padding: 0;border: 0;" class={view_daftar == "kesehatan" ? "" : "opacity-30"} on:click={changeView("kesehatan")}><img src={ImageKesehatan} alt="Lihat catatan kesehatan"/></Button>
        <div class="mx-2"></div>
        <Button color="blue" style="width: 50%;padding: 0;border: 0;" class={view_daftar == "nifas" ? "" : "opacity-30"} on:click={changeView("nifas")} ><img  src={ImageNifas} alt="Lihat catatan nifas"/></Button>
        <!-- <div class="usl border rounded-lg flex items-center justify-center p-3" style="width: 150px;height:80px"> Catatan Nifas</div> -->
    </div>
    <div class="text-sm font-bold mb-3">Daftar Catatan</div>
    <ul class="flex-grow">
        {#if view_daftar == "kesehatan"}
            {#each data_set as item}
                <ListCatatanKesehatan {item}/>
            {/each}
        {:else}
            {#each data_set as item}
                <ListCatatanNifas {item} />
            {/each}
        {/if}
    </ul>
    <br>
    <br>
    <br>
</div>

<style>
    .usl {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
    }
</style>