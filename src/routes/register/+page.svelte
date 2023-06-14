<script>
  import { Label, Input, Button, Checkbox, Helper } from "flowbite-svelte";
  import Password from "../../lib/assets/icons/password.svelte";
  import Mail from "../../lib/assets/icons/mail.svelte";
  import Call from "../../lib/assets/icons/call.svelte";
  import Home from "../../lib/assets/icons/home.svelte";
  import Stetoscope from "../../lib/assets/icons/stetoscope.svelte";
  import Women from "../../lib/assets/icons/women.svelte";
  import Number from "../../lib/assets/icons/number.svelte";
  import { onMount } from "svelte";

  let role = null;
  let form = null;
  let roleContainer = null;

  let submitted = false;
  let confirm = true;

  function changeRole(v) {
    role = v;
  }

  onMount(() => {
    const inputs = form.querySelectorAll("input")

    // console.log(inputs)
  })

  function submit() {
    // form.submit();
    const data = new FormData(form)
    const parse = Object.fromEntries([...data.keys()].map(k => [k, data.get(k)]))
    console.log([...data.values()])
  }

  function handleSubmit() {
    if (form["password"].value != form["confirm"].value) {

      form["password"].scrollIntoView({block: "start", behavior: "smooth"})
    }

    if (role) {
      form.submit()
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
      <Label class="block mb-2 relative">Siapakah anda?</Label>
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
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2" color={!confirm ? "red" : undefined} >Password</Label>
      <Input type="password" name="password" placeholder="Enter your password" {...{color: !confirm ? "red" : undefined}} required>
        <Password
          slot="left"
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </Input>
    </div>
    <div class="mb-6">
      <Label for="input-group-1" class="block mb-2" color={!confirm ? "red" : undefined}>Confirm Password</Label>
      <Input type="password" name="confirm" placeholder="Re-enter your password" {...{color: !confirm ? "red" : undefined}} required>
        <Password
          slot="left"
          aria-hidden="true"
          class={`w-5 h-5 text-${!confirm ? "red" : "grey"}-500 dark:text-${!confirm ? "red" : "grey"}-400`}
        />
      </Input>
      {#if !confirm}
        <Helper class="mt-2" color="red">Password and Confirm password are not equal</Helper>
      {/if}
    </div>

    <!-- <Checkbox class="my-3 mt-11"
      >I agree and accept&nbsp;<a
        href="http://google.com"
        class="text-primary-500 font-bold">Privacy Policy</a
      ></Checkbox
    > -->
    <Button class="w-full mt-7" on:click={() => {
      submitted = true;
      if(!role) roleContainer.scrollIntoView({block: "start", behavior: "smooth"})
    }}>Sign Up</Button>
  </form>

  <div class="text-center my-7 text-sm">
    Already have an account? <a href="/register" class="text-primary-500 font-bold"
      >Login</a
    >
  </div>
  <br />
  <br />
  <br />
</div>

<style>
  input[name="role"]:invalid {
    outline: none;
  }
</style>
