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

  import api from "$lib/sdk"

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
    
    let user = await api.getMyProfile()
    user_data = user.data

    console.log(user, user_data)

    let requests = await Promise.allSettled([
      user_data.clinic && api.getClinicDetails(user_data.clinic.id),
      api.getNextAppointment(),
      user_data.clinic && api.getClinicPatients(user_data.clinic.id)
    ])

    requests = Array.from(requests).map(request => request.value?.data)

    klinik = requests[0];
    jadwal = requests[1];
    bumil = requests[2];


    if (!klinik) {
      goto("/clinic");
      return;
    }

    if (user_data.role != "bidan") {
      goto("/app");
    }

    load = true;
  });

</script>

<div class="w-full flex flex-col h-full p-5">
  <ProfileHeader name={user_data?.name}/>
  {#if klinik}
    <ClinicHeader {klinik} />
  {/if}

  <div class="text-sm font-bold mb-3">Pertemuan berikutnya</div>
  <JadwalComponent {jadwal} />

  <div class="text-sm font-bold mb-3">Daftar Ibu Hamil</div>
  <ul class="flex-grow w-full">
    {#if bumil && bumil.length > 0}
      {#each bumil as item}
        <ItemListBumil {...{...item, contact: item.phone}} on:detail={show} />
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
