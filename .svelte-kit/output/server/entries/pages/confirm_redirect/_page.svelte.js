import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */const Congratulation = "/_app/immutable/assets/congratulation.beb9023e.png";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container w-full flex flex-col h-full items-center justify-center p-7"><div class="my-7"></div>
    <img${add_attribute("src", Congratulation, 0)} alt="Ilustrasi ibu yang sedang senang sampai melompat">
    <span class="text-lg font-bold mt-7">Akun anda telah terverifikasi!</span>
  
    <p class="text-base text-gray-500 text-center mt-2">Mulai gunakan aplikasi checkbund dan temukan bidan di sekitar anda sekarang!
    </p>
    <div class="mt-7">${validate_component(Button, "Button").$$render(
    $$result,
    {
      href: "com.checkbund.app://localhost/",
      color: "blue"
    },
    {},
    {
      default: () => {
        return `Buka aplikasi`;
      }
    }
  )}</div></div>`;
});
export {
  Page as default
};
