<script>
  import { Button, CloseButton, A } from "flowbite-svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ListCatatan from "../../../lib/components/ListCatatan.svelte";
  import { getUserData, guardian, supabase, formatDate } from "../../../lib/client";
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

  $: console.log(filtered)

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

    jadwal = jadwal && jadwal[0]

    klinik = klinik && klinik[0];

    user_data = user.data;
  }

  function requests() {
    return [
      getUserData(),
      [
        ({ clinic }) =>
          clinic && supabase.from("clinic").select("*").eq("id", clinic),
          () => supabase.from("catatan").select("return_date, user_data!catatan_bidan_fkey ( name, address, contact )").limit(1).gte("return_date", formatDate(Date.now())),
        ({ id }) => supabase.from("catatan").select("id,return_date, created_at,pasien, bidan, catatan, type,user_data!catatan_bidan_fkey ( name )").eq("pasien", id),
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
