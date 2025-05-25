<script>
    import { Label, Input, Button, Checkbox, Textarea } from 'flowbite-svelte'
    import { Spinner } from 'flowbite-svelte';
    import { guardian } from '$lib/client';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import api from "$lib/sdk"
  
    let form = null;
    let signed
    let user_data;
    let error;
  
    onMount(async () => {
      await guardian();

      let requestMyProfile = await api.getMyProfile()
      user_data = requestMyProfile.data

      if (user_data?.clinic) {
        goto("/app");
        return
      }
    })

    async function handleSubmit() {
      if (user_data?.clinic) {
        goto("/app");
        return
      }

      signed = true;
      const inputs = new FormData(form)
      const parse = Object.fromEntries([...inputs.keys()].map(k => [k, inputs.get(k)]))
  
      const requestCreateClinic = await api.createClinic(parse)

      signed = false;
      if (requestCreateClinic.success) {
        goto("/app")
      } else {
        error = _error.message;
      }
    }


    function useMyNumber() {
      if (user_data?.phone) {
        form['contact'].value = user_data.phone
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
      <Button class="w-full" color="primary" type="submit" disabled={signed}>Daftar Klinik{#if signed}<Spinner class="mx-3" size={4}/>{/if}</Button>
    </form>

  </div>
  