<script>
  import { Button, CloseButton, A } from "flowbite-svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import LabledValue from "../../../lib/components/LabledValue.svelte";
  import BottomSheet from "../../../lib/components/BottomSheet.svelte";
  import Schedule from "../../../lib/assets/icons/schedule.svelte";
  import ListCatatan from "../../../lib/components/ListCatatan.svelte";
  import { getUserData, guardian, supabase } from "../../../lib/client";
  import ClinicHeader from "../../../lib/components/ClinicHeader.svelte";
  import ProfileHeader from "../../../lib/components/ProfileHeader.svelte";

  let view_daftar = "nifas";

  let user_data;
  let catatan;
  let jadwal;
  let klinik;
  let load = false;


  $: filtered = Array.isArray(catatan)
    ? catatan.filter((item) => item.type == view_daftar)
    : [];

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

    // Fetch to supabase for data list
    // fetch catatan
    // fetch jadwal
    load = true;
  });

  async function hydration() {
    // let results = await Promise.allSettled(requests());

    let req = requests();
    let user = await req[0]

    console.log(user)

    if(!user.data && user.error) {
      // return
    }

    let results = req[1].map((promise) => {
      return promise(user.data);
    });

    [klinik, jadwal, catatan] = (await Promise.allSettled(results)).map(
      (res) => res.value?.data
    );
    klinik = klinik && klinik[0];

    user_data = user.data;
  }

  function requests() {
    return [
      getUserData(),
      [
        ({ clinic }) =>
          clinic && supabase.from("clinic").select("*").eq("id", clinic),
        ({ id }) => supabase.from("jadwal").select("*").eq("pasien", id),
        ({ id }) => supabase.from("catatan").select("return_date, created_at,pasien, bidan, catatan, type,user_data!catatan_bidan_fkey ( name )").eq("pasien", id),
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
  <ProfileHeader name={user_data?.name} />
  <ClinicHeader {klinik} />

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

  <div class="text-sm font-bold mb-3">Daftar Catatan</div>
  <div class="w-full flex items-center justify-center mb-6">
    <button
      color="primary"
      style="width: 50%;padding: 0;border: 0;trasnition: .5s"
      class={view_daftar == "kesehatan"
        ? "shadow-md rounded-3xl"
        : "opacity-30"}
      on:click={changeView("kesehatan")}
      ><img src={ImageKesehatan} alt="Lihat catatan kesehatan" /></button
    >
    <div class="mx-2" />
    <button
      color="primary"
      style="width: 50%;padding: 0;border: 0;"
      class={view_daftar == "nifas" ? "shadow-md rounded-3xl" : "opacity-30"}
      on:click={changeView("nifas")}
      ><img src={ImageNifas} alt="Lihat catatan nifas" /></button
    >
  </div>
  <ul class="flex-grow">
    {#if filtered && filtered.length > 0}
      {#each filtered as data_catatan}
        <ListCatatan {data_catatan} />
      {/each}
    {:else}
        <div class="bg-blue-50 rounded-md border p-5">
            <div class="text-center text-gray-500 text-sm">
                Anda belum memiliki catatan
            </div>
        </div>
    {/if}
  </ul>
  <br />
  <br />
  <br />
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
