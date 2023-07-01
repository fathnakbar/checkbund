<script>
  import { Button } from "flowbite-svelte";
  import { logout } from "../../../lib/client";
  import { goto } from "$app/navigation";

  async function _logout() {
    await logout();
    goto("/")
  }

</script>
<div class="container mx-auto p-4">
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="text-center mt-4">
        <h2 class="text-xl font-semibold">Nama Lengkap</h2>
        <p class="text-gray-600">Email: example@example.com</p>
        <div class="text-center mt-4 mb-4">
            <a href="#" class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Edit Profil</a>
            <a href="#" class="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Ubah Password</a>
          </div>
      </div>
      
      <div class="border-t border-gray-300 mt-4">
        <ul class="divide-y divide-gray-300">
          <li class="p-4">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  
              <p class="text-gray-600">No Telepon: 0812313213123 </p>
            </div>
          </li>
          <li class="p-4">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                  
              <p class="text-gray-600">Tanggal Lahir: 10 Januari 1990</p>
            </div>
          </li>
          <li class="p-4">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>                  
              <p class="text-gray-600">Alamat: Jl. Contoh Alamat No. 123</p>
            </div>
          </li>
          <li class="p-4">
            <Button on:click={logout}>Logout</Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  