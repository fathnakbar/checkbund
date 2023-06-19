<script>
    import Congratulation from "$lib/assets/images/congratulation.png";
    import { Button } from "flowbite-svelte";
  </script>
  
  <div class="container w-full flex flex-col h-full items-center justify-center p-7">
    <div class="my-7"></div>
    <img src={Congratulation} alt="Ilustrasi ibu yang sedang senang sampai melompat" />
    <span class="text-lg font-bold mt-7">Akun anda telah terverifikasi!</span>
  
    <p class="text-base text-gray-500 text-center mt-2">
      Mulai gunakan aplikasi checkbund dan temukan bidan di sekitar anda sekarang!
    </p>
    <div class="mt-7">
        <Button href="com.checkbund.app://localhost/" color="blue">Buka aplikasi</Button>
    </div>
  </div>
  