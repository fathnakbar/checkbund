import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import "../../../chunks/client.js";
import "@capacitor/preferences";
import { L as Loading } from "../../../chunks/loading.js";
/* empty css                                                       */const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${`${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}`;
});
export {
  Page as default
};