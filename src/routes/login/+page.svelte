<script>
  import { Label, Input, Button, Checkbox } from 'flowbite-svelte'
  import Password from '../../lib/assets/icons/password.svelte';
  import Google from "../../lib/assets/icons/google.png"
  import Mail from '../../lib/assets/icons/mail.svelte';
  import { Spinner } from 'flowbite-svelte';
  import { guardian, setSession, signIn } from '../../lib/client';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let form = null;
  let signed
  let google_signed
  let type = "password";
  let show=()=>{
    if(type=="password"){
      type = "text";
    }else{
      type= "password";
    }
  }

  onMount(guardian)

  async function handleSubmit() {
    signed = true;
    const inputs = new FormData(form)
    const parse = Object.fromEntries([...inputs.keys()].map(k => [k, inputs.get(k)]))

    const {data: {session}, error} = await signIn(parse);

    if (!error && session) {
      await setSession(session)
      goto("/")
    }
  }

  async function googleSignIn() {
    google_signed = true;
    const {data, error} = await signIn({provider: "google"});
  }
</script>

<div class="p-7">
  <div class="my-7">
    <h1 class="font-bold text-lg">Welcome Back!</h1>
    <span class="text-gray-500 text-sm">Enter your username and password to conitnue!</span>
  </div>
  <form action="post" on:submit|preventDefault={handleSubmit} bind:this={form}>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Username</Label>
      <Input name="email" type="email" placeholder="example@gmail.com" required>
        <Mail slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </Input>
    </div>
    <div class="mb-6">
      <!-- <label class="font-thin text-gray-900 uppercase" for="password">password</label> -->
      <Label for="password" class="block mb-2 ">Password</Label>
      <div class="relative">
      
      <Input name="{type}" type="{type}" placeholder="Enter your password" required>
      <Password slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </Input>
    <div on:click="{show}" class="absolute top-1 right-3">
      {#if type == "password"}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
        {/if}
        </div>
      </div>
    </div>
    <div class="flex justify-between my-6">
      <Checkbox>Remember me</Checkbox>
      <a href="/forgot_password" class="text-sm text-primary-500">Forgot password?</a>
    </div>
    <Button class="w-full" color="primary" type="submit" disabled={google_signed}>Sign In{#if signed}<Spinner class="mx-3" size={4}/>{/if}</Button>
  </form>
  <div class="text-center text-gray-500 text-sm my-3">or</div>
  <Button class="w-full" color="light" on:click={googleSignIn} disabled={signed}>
    <img src={Google} alt="google icon" width="24" class="mx-2"/> Sign in with Google {#if google_signed}<Spinner class="mx-3" size={4}/>{/if}
  </Button>

  <div class="text-center my-7 text-sm">Don't have an account? <a href="/register" class="text-primary-500">Register</a></div>
</div>


<style>
  
</style>