<script>
  import { onMount } from "svelte";

  let sheet;
  let scroll_lock = true;
  let visible = true;

  export let hidden = true;

  onMount(() => {
    hidden ? close() : show();
  });

  $: sheet != undefined && (hidden ? close() : show());

  function show() {
    let content = sheet.querySelector(".content");
    let blocker = sheet.querySelector(".blocker");
    visible = true;
    scroll_lock = true;
    sheet.style.background = "rgba(70, 70, 70, 0.7)";
    sheet.style.display = "block";
    blocker.style.display = "block"

    let peek =
      content.offsetHeight >= sheet.height
        ? content.offsetHeight / 2
        : content.offsetHeight;

    sheet.scrollTo({
      top: peek,
      behavior: "smooth",
    });

    sheet.onscroll = (e) => {
      if (
        scroll_lock &&
        visible &&
        e.target.scrollTop >= content.offsetHeight - 10
      ) {
        scroll_lock = false;
        blocker.style.display = "none"
        console.log("Remove blocker")
      }

      if (scroll_lock && !visible && e.target.scrollTop == 0) {
        scroll_lock = false;
        hide();
      }

      if (!scroll_lock && visible && e.target.scrollTop < content.offsetHeight / 3) {
        console.log("Auto scroll!")
        hidden = true
      }
    };
  }

  function close() {
    if (sheet.scrollTop == 0) {
      hide();
    }

    scroll_lock = true;
    visible = false;
    let blocker = sheet.querySelector(".blocker");
    sheet.style.background = "rgba(0, 0, 0, 0)";
    blocker.style.display = "block"


    sheet.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function hide() {
    sheet.style.display = "none";
  }
</script>

<div class="top-0 h-full w-full absolute z-99" id="sheet" bind:this={sheet}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="blocker" />
  <div class="offset h-full" on:click={() => (hidden = true)} />
  <div class="content bg-white px-7 py-5" style="border-radius: 20px 20px 0 0;">
    <slot />
  </div>
</div>

<style>
  .blocker {
    width: 100%;
    position: fixed;
    height: 100%;
  }
  #sheet {
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0);
    transition: 0.5s;
  }
</style>
