<script>
  import { Button, CloseButton, A } from "flowbite-svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ListCatatan from "../../../lib/components/ListCatatan.svelte";
  import { guardian } from "../../../lib/client";
  import api from "$lib/sdk";
  import ClinicHeader from "../../../lib/components/ClinicHeader.svelte";
  import ProfileHeader from "../../../lib/components/ProfileHeader.svelte";
  import JadwalComponent from "../../../lib/components/JadwalComponent.svelte";

  let view_daftar = "kesehatan";

  let user_data;
  let catatan;
  let jadwal;
  let klinik;
  let load = false;

  $: filtered = Array.isArray(catatan)
    ? catatan.filter((item) => item.type == view_daftar)
    : [];

  $: console.log(filtered);

  onMount(async () => {
    await guardian();
    
    let user = await api.getMyProfile();
    user_data = user.data

    ([klinik, jadwal, catatan] = await Promise.allSettled([
      user_data.clinic && api.getClinicDetails(user_data.clinic),
      api.getNextAppointment(),
      user_data.id && api.getAllCatatanForPatient(user_data.id),
    ])).map(request => request.data)

    if (!klinik) {
      goto("/clinic");
      return;
    }

    if (user_data.role != "bumil") {
      goto("/app");
    }

    load = true;
  });


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
  <JadwalComponent {jadwal} />

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
      class={view_daftar == "KB" ? "shadow-md rounded-3xl" : "opacity-30"}
      on:click={changeView("KB")}
      ><img src={ImageNifas} alt="Lihat catatan KB" /></button
    >
  </div>
  <ul class="flex-grow">
    {#if filtered && filtered.length > 0}
      {#each filtered as data_catatan (data_catatan.id)}
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
  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
</style>
