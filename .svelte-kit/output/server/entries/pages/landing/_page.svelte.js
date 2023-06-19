import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index.js";
import "../../../chunks/client.js";
const IlustrasiBidan = "/_app/immutable/assets/ilustrasi_bidan.70abe49a.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".svelte-hyyzmn.svelte-hyyzmn{-webkit-user-select:none;-moz-user-select:none;user-select:none}div.container.svelte-hyyzmn.svelte-hyyzmn{height:100vh;padding:11px}div.container.svelte-hyyzmn>.svelte-hyyzmn{margin:7px}.button-group.svelte-hyyzmn>.svelte-hyyzmn{padding:5px 11px;border-radius:4px;margin:7px}.button-group.svelte-hyyzmn>.svelte-hyyzmn:active{opacity:0.5}.button-group.svelte-hyyzmn>.svelte-hyyzmn:nth-child(1){background-color:rgb(243, 225, 202)}.button-group.svelte-hyyzmn>.svelte-hyyzmn:nth-child(2){background-color:rgb(97, 132, 248);color:white}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container w-full flex flex-col h-full items-center justify-center svelte-hyyzmn"><div class="my-11 svelte-hyyzmn"></div>
  <img${add_attribute("src", IlustrasiBidan, 0)} alt="Ilustrasi bidan sedang menggendong bayi" class="svelte-hyyzmn">
  <span class="text-2xl font-bold svelte-hyyzmn">Checkbund</span>

  <p class="text-bg text-center svelte-hyyzmn">Checkbund, teman setia ibu hamil dan bidan dalam perjalanan kehamilan yang
    lancar!
  </p>
  <div class="button-group flex items-center justify-center my-5 svelte-hyyzmn"><a href="/register" class="svelte-hyyzmn">Register</a>
    <a href="/login" class="svelte-hyyzmn">Login</a></div>
  <div class="my-11 svelte-hyyzmn"></div>
</div>`;
});
export {
  Page as default
};
