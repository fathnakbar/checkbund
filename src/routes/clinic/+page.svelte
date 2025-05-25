<script>
  import { onMount } from "svelte";
  import { guardian } from "$lib/client";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import Loading from "../../lib/components/loading.svelte";
  import api from "$lib/sdk"

  let user_data;
  let clinics = [];
  let load = false;

  onMount(async () => {
    await guardian();

    let requestClinics = await api.getAllClinics()

    if (requestClinics.success) {
      clinics = requestClinics.data;
    }

    let requestMyProfile = await api.getMyProfile()

    if (requestMyProfile.success) {
      user_data = requestMyProfile.data;
      if(user_data?.clinic){
          goto("/app")
          return
      }
    }


    load = true;
  });

  function signClinic(id) {
    return async () => {
        load = false;

        if(user_data?.clinic){
            goto("/app")
            return
        }

      const requestUpdateProfile = await api.updateProfile(user_data.id, { clinic: id })

      if (requestUpdateProfile.success) {
        load = true;
        goto("/app")

      }
    };
  }
</script>

{#if !load}
    <Loading />
    {:else}

<div class="p-7 h-screen">
  <div class="w-full h-full">
    {#if user_data?.role == "bidan"}
      <Button class="w-full mb-6" color="light" size="sm" href="/clinic/new"
        >Daftar klinik baru</Button
      >
    {/if}
    <div class="list w-full overflow-y-scroll">
      {#if clinics.length > 0}
        <div class="w-full text-center text-gray-500 mb-5">
          Pilih salah satu klinik terdekat anda
        </div>
        {#each clinics as clinic}
          <div class="flex justify-between items-center p-2">
            <div>
              <b>{clinic?.name}</b>
              <br />
              <span class="text-sm text-gray-500">{clinic?.address}</span>
            </div>
            <Button size="xs" class="ml-3" on:click={signClinic(clinic.id)}>Daftar</Button>
          </div>
        {/each}
      {:else}
        <div class="w-full text-center text-gray-500">
          Tidak ada clinic saat ini
        </div>
      {/if}
    </div>
  </div>
</div>
{/if}
