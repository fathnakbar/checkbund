<script>
  import { Label, Input, Button, Helper, Spinner } from "flowbite-svelte";
  import Password from "../../lib/assets/icons/password.svelte";
  import Mail from "../../lib/assets/icons/mail.svelte";
  import Call from "../../lib/assets/icons/call.svelte";
  import Home from "../../lib/assets/icons/home.svelte";
  import Stetoscope from "../../lib/assets/icons/stetoscope.svelte";
  import Women from "../../lib/assets/icons/women.svelte";
  import Number from "../../lib/assets/icons/number.svelte";
  import { PREFERENCE_KEYS, guardian, signUp } from "../../lib/client";
  import { onMount } from "svelte";
  import { Preferences } from '@capacitor/preferences';
  import { goto } from "$app/navigation";

  let role = "bumil";
  let form = null;
  let roleContainer = null;

  let submitted = false;
  let form_submitted = false;
  let password_err = "";
  let confirm_err = "";
  let type = "password";
  let show=()=>{
    if(type=="password"){
      type = "text";
    }else{
      type= "password";
    }
  }

  $: confirm_hint = confirm_err ? "red" : undefined
  $: password_hint = password_err ? "red" : undefined

  function changeRole(v) {
    role = v;
  }

  onMount(async () => {
    // form["name"].value = "Gadila Asa Penjuru";
    // form["email"].value = "fathnakbar@gmail.com";
    // form["phone"].value = "081278596622";
    // form["address"].value = "Bandung";
    // form["password"].value = "password123";
    // form["confirm"].value = "password123";

    form["password"].oninput = () => {password_err = ""}
    form["confirm"].oninput = () => {confirm_err = ""}

    await guardian()

  })

  async function handleSubmit() {

    // TODO: Update input validation!!!

    
    const inputs = Object.fromEntries(Array.from(form.querySelectorAll("input")).map(e => [e.name, e.value]));

    console.log(inputs)

    const validation = [inputs.password.length < 8, inputs.password != inputs.confirm, !role]; // Error expression

    if (validation[0]) {
      password_err = "Password length has to be >= 8"
    }

    if (validation[1]) {
      confirm_err = "Password and confirmation are not equal"
    }

    if(validation[2]) {
      roleContainer.scrollIntoView({block: "start", behavior: "smooth"})
      submitted = true;
    }

    if (validation.filter(e => e == true).length == 0) {
      form_submitted = true;
      const {data: {user}, error} = await signUp({email: inputs.email, password: inputs.password})
      if (!error && user) {
        await Preferences.set({
          key: PREFERENCE_KEYS.HAS_SIGNUP,
          value: JSON.stringify({user, inputs})
        })

        goto("/wait_confirm")
      }

    }
  }
</script>

<div class="p-7">
  <div class="my-7">
    <h1 class="font-bold text-lg">Create Account</h1>
    <span class="text-gray-500 text-sm"
      >Join the Checkbund community today!</span
    >
  </div>
  <form bind:this={form} on:submit|preventDefault={handleSubmit}>
    <div class="mb-6 pt-5" bind:this={roleContainer}>
      <input type="text" name="role" class="hidden" bind:value={role} />
      <Label class={`block mb-3 relative ${!role && submitted && "text-red-600"}`}>Siapakah anda?</Label>
      <Button color={role == "bidan" ? "primary" : "light"} on:click={changeRole.bind(null,"bidan")}><Stetoscope class="w-5 h-5"/>Bidan</Button>
      <Button color={role == "bumil" ? "primary" : "light"} on:click={changeRole.bind(null,"bumil")}><Women class="w-5 h-5" />Ibu Hamil</Button>
      {#if !role && submitted}
        <div class="text-red-500 text-sm mt-3">Pilih salah satu peran di atas</div>
      {/if}
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Nama Lengkap</Label>
      <Input name="name" type="text" placeholder="cth: Gadila Asa Penjuru" required/>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Email</Label>
      <Input name="email" type="email" placeholder="cth: contoh@gmail.com" required>
        <Mail
          slot="left"
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Nomor Telpon</Label>
      <Input name="phone" type="number" placeholder="cth: 086381142522" required>
        <Call
          slot="left"
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Alamat Lengkap</Label>
      <Input
        type="text"
        name="address"
        placeholder="cth: Dayeuhkolot, Bandung, Jawa Barat"
        required="true"
      >
        <Home
          slot="left"
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </div>
    {#if role == "bidan"}
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Nomor STR</Label>
      <Input type="number" name="no_str" placeholder="Ketik nomor STR" required>
        <Number
          slot="left"
          aria-hidden="true"
          class="w-7 h-7 text-gray-500 dark:text-gray-400"
          required="true"
        />
      </Input>
    </div>
    {/if}
    {#if role == "bumil"}
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Tanggal lahir</Label>
      <Input type="date" name="birth" required />
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2">Nama Suami</Label>
      <Input type="text" name="husband" placeholder="Masukkan nama suami anda" required />
    </div>
    {/if}
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2" color={password_hint} >Password</Label>
      <div class="relative">
      <Input type="{type}" name="password" placeholder="Enter your password" {...{color: password_hint}} required>
        <Password
          slot="left"
          aria-hidden="true"
          class={`w-5 h-5 text-${password_hint || "grey"}-500 dark:text-${password_hint || "grey"}-400`}
        />
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
      {#if password_err}
       <Helper class="mt-2" color="red">{password_err}</Helper>
     {/if}
    </div>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2" color={confirm_hint}>Confirm Password</Label>
      <div class="relative">
      <Input type="{type}" name="confirm" placeholder="Re-enter your password" {...{color: confirm_hint}} required>
        <Password
          slot="left"
          aria-hidden="true"
          class={`w-5 h-5 text-${confirm_hint || "grey"}-500 dark:text-${confirm_hint || "grey"}-400`}
        />
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
      {#if confirm_err}
        <Helper class="mt-2" color="red">{confirm_err}</Helper>
      {/if}
    </div>
    </div>

    <!-- <Checkbox class="my-3 mt-11"
      >I agree and accept&nbsp;<a
        href="http://google.com"
        class="text-primary-500 font-bold">Privacy Policy</a
      ></Checkbox
    > -->
    <Button class="w-full mt-7" type="submit">Sign Up {#if form_submitted}<Spinner class="mx-3" size={4}/>{/if}</Button>
  </form>

  <div class="text-center my-7 text-sm">
    Already have an account? <a href="/login" class="text-primary-500 font-bold"
      >Login</a
    >
  </div>
  <br />
  <br />
  <br />
</div>
