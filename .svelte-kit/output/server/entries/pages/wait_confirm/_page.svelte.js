import { c as create_ssr_component, d as add_attribute, v as validate_component } from "../../../chunks/index.js";
import "@capacitor/preferences";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */import "../../../chunks/client.js";
const Image = "/_app/immutable/assets/sent.f3466be6.png";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container w-full flex flex-col h-full items-center justify-center p-3"><div class="my-3"></div>
  <img${add_attribute("src", Image, 0)} alt="Ilustrasi ibu yang sedang senang sampai melompat">
  <span class="text-base font-bold text-center">Kami telah mengirimkan anda email</span>

  <p class="text-base text-gray-500 text-center mt-2">Cek inbox email anda untuk verifikasi akun. Tekan lanjut jika anda sudah melakukan konfirmasi!
  </p>
  ${validate_component(Button, "Button").$$render($$result, { class: "mt-5" }, {}, {
    default: () => {
      return `Lanjut`;
    }
  })}
  <div class="my-11"></div></div>`;
});
export {
  Page as default
};
