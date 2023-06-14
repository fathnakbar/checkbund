<script>
    import { Label, Input, Button, Checkbox } from 'flowbite-svelte'
    import Password from '../../lib/assets/icons/password.svelte';
    import Mail from '../../lib/assets/icons/mail.svelte';
    import Call from '../../lib/assets/icons/call.svelte';
    import Home from '../../lib/assets/icons/home.svelte';
  </script>
  
  <div class="p-7">
    <div class="my-7">
      <h1 class="font-bold text-lg">Create Account</h1>
      <span class="text-gray-500 text-sm">Join the Checkbund community today!</span>
    </div>
    <form action="post">
        <div>
            <!-- Roles -->
        </div>
    <div class="mb-6">
    <Label for="input-group-1" class="block mb-2">Nama Lengkap</Label>
    <Input id="text" type="email" placeholder="cth: Gadila Asa Penjuru"></Input>
    </div>  
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Email</Label>
        <Input id="email" type="email" placeholder="cth: contoh@gmail.com">
        <Mail slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </div>
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Nomor Telpon</Label>
        <Input id="number" type="email" placeholder="cth: 086381142522">
        <Call slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </div>
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Alamat Lengkap</Label>
        <Input id="text" type="email" placeholder="cth: Dayeuhkolot, Bandung, Jawa Barat">
        <Home slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input>
      </div>
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Password</Label>
        <Input id="password" type="email" placeholder="Enter your password">
        <Password slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </Input>
      </div>
      <div class="mb-6">
        <Label for="input-group-1" class="block mb-2">Confirm Password</Label>
        <Input id="password" type="email" placeholder="Re-enter your password">
        <Password slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </Input>
      </div>

      <Checkbox class="my-3 mt-11">I agree and accept&nbsp;<a href="http://google.com" class="text-blue-500 font-bold">Privacy Policy</a></Checkbox>
      <Button class="w-full" color="blue">Sign Up</Button>
    </form>
  
    <div class="text-center my-7 text-sm">Already have an account? <a href="/register" class="text-blue-500 font-bold">Login</a></div>
    <br>
    <br>
    <br>
  </div>
  
  
  <style>
    
  </style>