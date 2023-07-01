<script>
    import { Label, Input, Button, Checkbox, Textarea } from 'flowbite-svelte'
    import { Spinner } from 'flowbite-svelte';
    import { guardian, setSession, signIn } from '$lib/client';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/client';
  import { checkClinicOwnership, getSession, getUserData } from '../../../lib/client';
  
    let form = null;
    let signed
    let google_signed
    let user_data;
    let error;
  
    onMount(async () => {
      await guardian();

      if (await checkClinicOwnership()) {
        goto("/app");
        return
      }


      await hydration();
    })

    async function hydration() {
      const {data, error: _error} = await getUserData();

      if (!_error && data) {
        user_data = data
        return
      }

      error = "Terjadi kesalahan dalam jaringan!";
    }

    async function handleSubmit() {
      if (await checkClinicOwnership()) {
        goto("/app");
        return
      }

      if (!user_data) {
        await hydration();
      }

      signed = true;
      const inputs = new FormData(form)
      const parse = Object.fromEntries([...inputs.keys()].map(k => [k, inputs.get(k)]))
  
      const {data, error: _error} = await supabase.from("clinic").insert({...parse, owner: user_data.id}).select();
      console.log("Submit klinik baru",data);

  
      signed = false;
      if (!_error) {

        await supabase.from("user_data").update({clinic: data[0].id}).eq("id", user_data.id);
        error = undefined;
        goto("/app")
      } else {
        // Error Hanlder

        console.log(_error)
        error = _error.message;
      }
    }


    function useMyNumber() {
      if (user_data?.contact?.phone) {
        form['contact'].value = user_data.contact.phone
      } else {
        hydration();
      }
    }
  </script>


<div class="p-7">
    <div class="my-7">
      <h1 class="font-bold text-lg">Daftar Klinik Baru</h1>
      <span class="text-gray-500 text-sm">Masukkan detail klinik anda!</span>
    </div>
    {#if error}
      <div class="bg-red-100 w-full p-3 mb-5 rounded-lg text-red-500">
        {error}
      </div>
    {/if}
    <form action="post" on:submit|preventDefault={handleSubmit} bind:this={form}>
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Nama Klinik</Label>
        <Input name="name" type="text" placeholder="cth: Klinik Bidan Nita" required />
      </div>
      <div class="mb-6">
        <Label class="block mb-2">Kontak Klinik</Label>
        <Input name="contact" type="number" placeholder="cth: 08123456789" required/>
        <Button size="xs" class="mt-3" color="light" on:click={useMyNumber}>Gunakan nomor saya</Button>
      </div>
      <div class="mb-6">
        <Label class="block mb-2">Alamat Klinik</Label>
        <Textarea name="address" placeholder="Masukkan alamat klinik" required/>
      </div>
      <Button class="w-full" color="primary" type="submit" disabled={google_signed}>Daftar Klinik{#if signed}<Spinner class="mx-3" size={4}/>{/if}</Button>
    </form>

  </div>
  