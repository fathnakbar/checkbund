<script>
  import { Button } from "flowbite-svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import ListCatatan from "$lib/components/ListCatatan.svelte";
  import { onMount } from "svelte";
  import { getUserData, supabase } from "../../../../lib/client";

  let view_daftar = "kesehatan";
  let pasien_id;
  let pasien_data;
  let catatan;

  $: filtered = Array.isArray(catatan)
    ? catatan.filter((item) => item.type == view_daftar)
    : [];

  onMount(async () => {
    pasien_id = window.location.hash.replace("#", "");
    const { data: user } = await getUserData();

    pasien_data = (
      await supabase.from("user_data").select("*").eq("id", pasien_id)
    ).data[0];
    const { data, error } = await supabase
      .from("catatan")
      .select("*")
      .eq("pasien", pasien_id)
      .eq("bidan", user.id);

    if (error && (!data || data.length == 0)) {
      // error
      return;
    }

    catatan = data;
  });

  function changeView(type) {
    return () => {
      view_daftar = type;
    };
  }

  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  }
  function show() {
    // Redirect to catatan view
  }
</script>

<div class="p-5">
  <div class="text-sm font-bold mb-6">Profil Ibu Hamil</div>
  <div class="mb-6">
    <div class="grid grid-cols-2 gap-4 mb-4 text-gray-500 text-sm">
      <div>
        <p class="text-sm font-medium">Nama:</p>
        <p class="text-black">{pasien_data?.name}</p>
      </div>
      <div>
        <p class="text-sm font-medium">Umur:</p>
        <p class="text-black">{calculateAge(pasien_data?.birth)}</p>
      </div>
      <div>
        <p class="text-sm font-medium">Nama Suami:</p>
        <p class="text-black">{pasien_data?.husband}</p>
      </div>
      <div>
        <p class="text-sm font-medium">Alamat:</p>
        <p class="text-black">{pasien_data?.address}</p>
      </div>
    </div>
  </div>
  <div class="text-sm font-bold">Daftar Catatan</div>
  <Button
    color="light"
    size="xs"
    class="my-6"
    href="/app/bidan/catatan/add#{pasien_id},{view_daftar}"
    >Tambah catatan {view_daftar} +</Button
  >
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
      ><img src={ImageNifas} alt="Lihat catatan kb" /></button
    >
  </div>
  <ul class="flex-grow">
    {#if filtered && filtered.length > 0}
      {#each filtered as item}
        <ListCatatan {item} on:detail={show} />
      {/each}
    {:else}
      <div class="bg-blue-50 rounded-md border p-5">
        <div class="text-center text-gray-500 text-sm">
          Anda belum memiliki catatan
        </div>
      </div>
    {/if}
  </ul>
</div>
