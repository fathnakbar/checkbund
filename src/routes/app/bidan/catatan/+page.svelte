<script>
  import { Button } from "flowbite-svelte";
  import ImageKesehatan from "$lib/assets/icons/Kesehatan.png";
  import ImageNifas from "$lib/assets/icons/Nifas.png";
  import ListCatatan from "$lib/components/ListCatatan.svelte";
  import { onMount } from "svelte";
  import { getUserData, supabase } from "../../../../lib/client";

  let view_daftar = "kesehatan";
  let pasien_id;
  let catatan;

  $: filtered = Array.isArray(catatan) ? catatan.filter(item => item.type == view_daftar) : []

  onMount(async () => {
    pasien_id = window.location.hash.replace("#", "");
    const {data: user} = await getUserData();
    const {data, error} = await supabase.from("catatan").select("*").eq("pasien", pasien_id).eq("bidan", user.id);

    if (error && (!data || data.length == 0)) {
        // error
        return
    }

    catatan = data;
  });

  function changeView(type) {
    return () => {
      view_daftar = type;
    };
  }

  function show() {
    // Redirect to catatan view
  }
</script>

<div class="p-5">
  <div class="text-sm font-bold">Daftar Catatan</div>
  <Button color="light" size="xs" class="my-6" href="/app/bidan/catatan/add#{pasien_id}">Tambah catatan +</Button>
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
