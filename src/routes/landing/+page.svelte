<script>
  import IlustrasiBidan from "../lib/assets/images/ilustrasi_bidan.jpg";

  // import IlustrasiBidan from "$lib/assets/images/ilustrasi_bida.jpg"
</script>

<div class="container w-full flex flex-col h-full items-center justify-center">
  <div class="my-11"></div>
  <img src={IlustrasiBidan} alt="Ilustrasi bidan sedang menggendong bayi" />
  <span class="text-2xl font-bold">Checkbund</span>

  <p class="text-bg text-center">
    Checkbund, teman setia ibu hamil dan bidan dalam perjalanan kehamilan yang
    lancar!
  </p>
  <div class="button-group flex items-center justify-center my-5">
    <a href="/register">Register</a>
    <a href="/login">Login</a>
  </div>
</div>

<style>
  * {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  div.container {
    height: 100vh;
    padding: 11px;
  }

  div.container > * {
    margin: 7px;
  }

  .button-group > * {
    padding: 5px 11px;
    border-radius: 4px;
    margin: 7px;
  }

  .button-group > *:active {
    opacity: 0.5;
  }

  .button-group > *:nth-child(1) {
    background-color: rgb(243, 225, 202);
  }

  .button-group > *:nth-child(2) {
    background-color: rgb(97, 132, 248);
    color: white;
  }
</style>
