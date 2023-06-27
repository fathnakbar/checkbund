<script>
  import { onMount } from "svelte";
  import { guardian, supabase } from "../../lib/client";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import Loading from "../../lib/components/loading.svelte";

  let user_data;
  let clinics = [];
  let load = false;

  onMount(async () => {
    await guardian();
    console.log(await checkOwn())
    if(await checkOwn()){
        goto("/app")
        return
    }

    let { data: clinic_data, error: _error } = await supabase
      .from("clinic")
      .select("*");

    if (clinic_data) {
      clinics = clinic_data;
    }

    let { data, error } = await supabase.from("user_data").select("*");

    if (data) {
      user_data = data[0];
    }

    load = true;
  });

  async function checkOwn() {
    return (await supabase.from("user_data").select("clinic")).data[0]?.clinic;
  }

  function signClinic(id) {
    return async () => {
        load = false;
        if (await checkOwn()) {
            load = true;
            goto("/app")
            return
        }

      const {error} = await supabase.from('user_data')
            .update({ clinic: id })
            .eq('id', user_data.id)
      if (!error) {
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
