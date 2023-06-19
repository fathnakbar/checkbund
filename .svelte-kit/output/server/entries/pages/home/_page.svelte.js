import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */import "../../../chunks/client.js";
import "@capacitor/preferences";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Sign Out`;
    }
  })}`;
});
export {
  Page as default
};
