<script>
  import Image from "$lib/assets/images/sent.png";
  import { Preferences } from "@capacitor/preferences";
  import { Button } from "flowbite-svelte";
  import { goto } from "$app/navigation"
  import { PREFERENCE_KEYS } from "../../lib/client";

  async function confirmed() {
    let {value: has_signup} = await Preferences.get({
      key: PREFERENCE_KEYS.HAS_SIGNUP
    });

    has_signup = JSON.parse(has_signup)


    await Preferences.set({
      key: PREFERENCE_KEYS.HAS_SIGNUP,
      value: JSON.stringify({...has_signup, confirmed: true})
    })

    goto("/confirmed")
    
  }
</script>

<div
  class="container w-full flex flex-col h-full items-center justify-center p-3"
>
  <div class="my-3" />
  <img src={Image} alt="Ilustrasi ibu yang sedang senang sampai melompat" />
  <span class="text-base font-bold text-center"
    >Kami telah mengirimkan anda email</span
  >

  <p class="text-base text-gray-500 text-center mt-2">
    Cek inbox email anda untuk verifikasi akun. Tekan lanjut jika anda sudah melakukan konfirmasi!
  </p>
  <Button class="mt-5" on:click={confirmed}>Lanjut</Button>
  <div class="my-11" />
</div>
