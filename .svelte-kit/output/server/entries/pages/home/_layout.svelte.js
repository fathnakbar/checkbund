import { c as create_ssr_component, e as escape } from "../../../chunks/index.js";
import "../../../chunks/client.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  return `<div>${escape(JSON.stringify(user))}</div>

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
