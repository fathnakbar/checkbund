<script>
  import { Button } from "flowbite-svelte";
  import { getUserData, logout } from "../../../lib/client";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";


  let user;

  onMount(async () => {
    const {data} = await getUserData();
    console.log(data)
    user = data
  })

  async function _logout() {
    await logout();
    goto("/")
  }

</script>
<div class="container mx-auto p-4">
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="text-center mt-4">
        <h2 class="text-xl font-semibold">{user?.name}</h2>
      </div>
      
      <div class="border-t border-gray-300 mt-4">
        <ul class="divide-y divide-gray-300">
          <li class="p-4">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  
              <p class="text-gray-600">{user?.contact?.phone}</p>
            </div>
          </li>
          <li class="p-4">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>                  
              <p class="text-gray-600">{user?.address}</p>
            </div>
          </li>
          <li class="p-4">
            <Button on:click={_logout}>Logout</Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  