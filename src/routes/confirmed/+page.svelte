<script>
  import { onMount } from "svelte";
  import {
    supabase,
    signIn,
    setSession,
    PREFERENCE_KEYS,
    guardian,
  } from "../../lib/client";
  import { goto } from "$app/navigation";
  import { Preferences } from "@capacitor/preferences";
  import Loading from "$lib/components/loading.svelte";
  import ErrorIllustratoin from "$lib/assets/images/error.png";
  import Whatsapp from "$lib/assets/images/whatsapp.png";
  import { Button } from "flowbite-svelte";

  let loading = true;
  let error;

  onMount(async () => {
    if (!(await guardian())) {
      return
    }
    let { value } = await Preferences.get({
      key: PREFERENCE_KEYS.HAS_SIGNUP,
    });

    value = JSON.parse(value);

    console.log(value);

    if (!value || (!value?.user && !value?.inputs)) {
      goto("/landing");
      return;
    }
    
    if (!value.confirmed) {
      goto("/wait_confirm")
    }

    const {
      user,
      inputs: { email, password, name, phone, no_str, role, address },
    } = value;

    const { data: { session }, error: error_signin } = await signIn({ email, password });

    error = error_signin?.name // Email not confirmed error

    if (!error_signin && session) {
      await setSession(session);

      const { data, error: err } = await supabase.from("user_data").insert({
        id: user.id,
        name,
        contact: { phone },
        no_str,
        address,
        role,
      });

      if (err && !data) {
        // Error: Insert 
      }
    }

    loading = false;

    if (!error) {
      await Preferences.remove({ key: PREFERENCE_KEYS.HAS_SIGNUP });
      goto("/home");
      return
    }

    if (error_signin?.status == 400) {
      console.log("redirect")
      goto("/wait_confirm")
      error = "";
    }

    
  });
</script>

{#if loading}
  <Loading />
{:else if error}
  <div
    class="container w-full flex flex-col h-full items-center justify-center p-7"
  >
    <div class="my-7" />
    <img
      src={ErrorIllustratoin}
      alt="Ilustrasi ibu yang sedang senang sampai melompat"
    />
    <span class="text-base text-center font-bold mt-3">{error}</span>

    <p class="text-base text-center mt-2">
      Terjadi kesalahan. Mohon periksa kembali informasi yang Anda masukkan dan
      coba lagi. Jika masalah masih berlanjut, silakan hubungi tim dukungan kami
      via whatsapp.
    </p>
    <div class="mt-7 flex flex-col">
      <Button href="/" color="blue" class="mb-3">Coba lagi</Button>
      <Button href="https://wa.me/+6283815411488" color="light"
        ><img
          src={Whatsapp}
          alt="Whatsapp icon"
          width="24"
          class="mx-2"
        />Hubungi kami</Button
      >
    </div>
    <div class="my-11"></div>
  </div>
{/if}
