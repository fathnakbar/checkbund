<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Schedule from "../../../lib/assets/icons/schedule.svelte";
  import { calculateRemainingDays, formatDate, getSession, guardian, supabase } from "../../../lib/client";
  import ItemListBumil from "../../../lib/components/ItemListBumil.svelte";
  import ProfileHeader from "../../../lib/components/ProfileHeader.svelte";
  import ClinicHeader from "../../../lib/components/ClinicHeader.svelte";
  import { Button } from "flowbite-svelte";
  import JadwalComponent from "../../../lib/components/JadwalComponent.svelte";

  let hidden8 = true;

  let user_data;
  let bumil;
  let jadwal;
  let klinik;
  let load = false;

  function show() {
    hidden8 = false;
  }

  onMount(async () => {
    await guardian();
    await hydration();

    console.log("Logging:", { klinik, bumil, jadwal, user_data });

    if (!klinik) {
      goto("/clinic");
      return;
    }

    if (user_data.role != "bidan") {
      goto("/app");
    }

    load = true;
  });

  async function hydration() {
    // let results = await Promise.allSettled(requests());

    let req = requests();
    let { user } = await getSession();
    user = await req[0](user);

    if(!user.data && user.error) {
      // return
    }

    let results = req[1].map((promise) => {
      return promise(user.data[0]);
    });

    [klinik, jadwal, bumil] = (await Promise.allSettled(results)).map(
      (res) => res.value?.data
    );

    jadwal = Array.isArray(jadwal) && jadwal[0]

    klinik = klinik && klinik[0];

    user_data = user.data[0];
  }

  function requests() {
    return [
      ({id}) => supabase.from("user_data").select("*").eq("id", id),
      [
        ({ clinic }) =>
          clinic && supabase.from("clinic").select("*").eq("id", clinic),
        () => supabase.from("catatan").select("return_date, user_data!catatan_pasien_fkey ( name, address, contact )").limit(1).gte("return_date", formatDate(Date.now())),
        ({ clinic }) => supabase.from("user_data").select("*").eq("clinic", clinic).eq("role", "bumil"),
      ],
    ];
  }
</script>

<div class="w-full flex flex-col h-full p-5">
  <ProfileHeader name={user_data?.name}/>
  <ClinicHeader {klinik} />

  <div class="text-sm font-bold mb-3">Pertemuan berikutnya</div>
  <JadwalComponent {jadwal} />

  <div class="text-sm font-bold mb-3">Daftar Ibu Hamil</div>
  <ul class="flex-grow w-full">
    {#if bumil && bumil.length > 0}
      {#each bumil as item}
        <ItemListBumil {...{...item, contact: item.contact.phone}} on:detail={show} />
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
  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
</style>
