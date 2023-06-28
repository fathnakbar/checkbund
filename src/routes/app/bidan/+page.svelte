<script>
  import { Button, CloseButton, A } from "flowbite-svelte";
  import Call from "../../../lib/assets/icons/call.svelte";
  import More from "../../../lib/assets/icons/more.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Schedule from "../../../lib/assets/icons/schedule.svelte";
  import ListCatatan from "../../../lib/components/ListCatatan.svelte";
  import { guardian, supabase } from "../../../lib/client";

  let view_daftar = "nifas";
  let hidden8 = true;

  let user_data;
  let catatan;
  let jadwal;
  let klinik;
  let load = false;

  function show() {
    console.log("Show me!");
    hidden8 = false;
  }

  onMount(async () => {
    await guardian();
    await hydration();

    console.log({ klinik, catatan, jadwal, user_data });

    if (!klinik) {
      goto("/clinic");
      return;
    }

    if (user_data.role != "bumil") {
      goto("/app");
    }

    load = true;
  });

  async function hydration() {
    // let results = await Promise.allSettled(requests());

    let req = requests();
    let user = await req[0];

    let results = req[1].map((promise) => {
      return promise(user.data[0]);
    });

    [klinik, catatan, jadwal] = (await Promise.allSettled(results)).map(
      (res) => res.value?.data
    );
    klinik = klinik && klinik[0];

    if (!user.error == "fulfilled") {
      user_data = user.data[0];
    }
  }

  function requests() {
    return [
      supabase.from("user_data").select("*"),
      [
        ({ clinic }) =>
          clinic && supabase.from("clinic").select("*").eq("id", clinic),
        ({ id }) => supabase.from("catatan").select("*").eq("pasien", id),
        ({ id }) => supabase.from("jadwal").select("*").eq("pasien", id),
        ({ clinic }) => supabase.from("user_data").select("policies").eq("clinic", clinic).eq("role", "bumil"),
      ],
    ];
  }

  function changeView(type) {
    return () => {
      view_daftar = type;
    };
  }
</script>

<div class="w-full flex flex-col h-full p-5">
  <div class="w-full flex justify-between mb-5">
    <div class="mb-3">
      <div class="text-base mb-1 font-bold">{klinik?.name}</div>
      <span class="text-gray-500 text-sm flex items-center">
        <!-- <Location class="w-4 h-4 mr-1" /> -->
        {klinik?.address}
      </span>
    </div>
    <div class="flex items-center ml-3">
      <Button
        href={"tel:" + klinik?.contact}
        size="xs"
        color="blue"
        class="rounded-md w-9 h-9"
        style="border-radius: 50%;"
      >
        <Call class="w-7 h-7 text-white" />
      </Button>
      <div style="margin: 0 7px" />
      <button><More height="20px" width="20px" /></button>
    </div>
  </div>

  <div class="text-sm font-bold mb-3">Pertemuan berikutnya</div>
  <div class="bg-blue-50 border w-full p-5 rounded-md mb-6">
    {#if !jadwal || jadwal.length == 0}
      <div class="text-center text-gray-500 text-sm">
        Anda belum memiliki jadwal temu
      </div>
    {:else}
      <div class="text-sm text-blue-500 flex items-center">
        <Schedule class="w-4 h-4 mr-1" style="margin-bottom: 1px;" />
        23 Juni 2023
        <span class="mx-2 bg-blue-500 devider" />
        09:45
      </div>
      <div class="my-5">
        <b>Bidan Nita</b>
        <div class="text-sm">Klinik bidan nita, Bandung</div>
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-gray-500">2 hari lagi</span>
        <button class="text-xs p-2 rounded-md bg-blue-500 text-white"
          >Hubungi</button
        >
      </div>
    {/if}
  </div>

  <div class="text-sm font-bold mb-3">Daftar Ibu Hamil</div>
  <ul class="flex-grow">
    {#if catatan && catatan.length > 0}
      {#each catatan as item}
        <ListCatatan {item} on:detail={show} />
      {/each}
    {:else}
        <div class="bg-blue-50 rounded-md border p-5">
            <div class="text-center text-gray-500 text-sm">
                Tidak ada ibu hamil yang terdaftar
            </div>
        </div>
    {/if}
  </ul>
  <ul>
    
  </ul>
  <br />
  <br />
  <br />
  <!-- List Ibu Hamil -->
  
</div>

<style>
  .devider {
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }
  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
</style>
