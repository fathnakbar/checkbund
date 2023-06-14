<script>
  import { Label, Input, Button, Checkbox } from 'flowbite-svelte'
  import Password from '../../lib/assets/icons/password.svelte';
  import Google from "../../lib/assets/icons/google.png"
  import Mail from '../../lib/assets/icons/mail.svelte';
</script>

<div class="p-7">
  <div class="my-7">
    <h1 class="font-bold text-lg">Welcome Back!</h1>
    <span class="text-gray-500 text-sm">Enter your username and password to conitnue!</span>
  </div>
  <form action="post">
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Username</Label>
      <Input id="email" type="email" placeholder="example@gmail.com">
        <Mail slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </Input>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Password</Label>
      <Input id="email" type="email" placeholder="Enter your password">
      <Password slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    </div>
    <div class="flex justify-between my-6">
      <Checkbox>Remember me</Checkbox>
      <a href="/forgot_password" class="text-sm text-primary-500">Forgot password?</a>
    </div>
    <Button class="w-full" color="primary">Sign In</Button>
  </form>
  <div class="text-center text-gray-500 text-sm my-3">or</div>
  <Button class="w-full" color="light">
    <img src={Google} alt="google icon" width="24" class="mx-2"/> Sign in with Google
  </Button>

  <div class="text-center my-7 text-sm">Don't have an account? <a href="/register" class="text-primary-500">Register</a></div>
</div>


<style>
  
</style>