import { c as create_ssr_component, d as compute_rest_props, g as getContext, v as validate_component, f as spread, k as escape_attribute_value, h as escape_object, i as add_attribute, q as compute_slots } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */import { twMerge } from "tailwind-merge";
import { L as Label, I as Input } from "../../../chunks/Input.js";
import { M as Mail, P as Password } from "../../../chunks/mail.js";
import "../../../chunks/client.js";
import "../../../chunks/sdk.js";
const colorClasses = {
  primary: "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600",
  secondary: "text-secondary-600 focus:ring-secondary-500 dark:focus:ring-secondary-600",
  red: "text-red-600 focus:ring-red-500 dark:focus:ring-red-600",
  green: "text-green-600 focus:ring-green-500 dark:focus:ring-green-600",
  purple: "text-purple-600 focus:ring-purple-500 dark:focus:ring-purple-600",
  teal: "text-teal-600 focus:ring-teal-500 dark:focus:ring-teal-600",
  yellow: "text-yellow-400 focus:ring-yellow-500 dark:focus:ring-yellow-600",
  orange: "text-orange-500 focus:ring-orange-500 dark:focus:ring-orange-600",
  blue: "text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
};
const labelClass = (inline, extraClass) => twMerge(inline ? "inline-flex" : "flex", "items-center", extraClass);
let spacing = "mr-2";
const inputClass = (custom, color, rounded, tinted, extraClass) => twMerge(
  "w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2",
  spacing,
  tinted ? "dark:bg-gray-600 dark:border-gray-500" : "dark:bg-gray-700 dark:border-gray-600",
  custom && "sr-only peer",
  rounded && "rounded",
  colorClasses[color],
  extraClass
);
const Checkbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "custom", "inline", "group", "value", "checked", "spacing"]);
  let $$slots = compute_slots(slots);
  let { color = "primary" } = $$props;
  let { custom = false } = $$props;
  let { inline = false } = $$props;
  let { group = [] } = $$props;
  let { value = "on" } = $$props;
  let { checked = void 0 } = $$props;
  let { spacing: spacing2 = "mr-2" } = $$props;
  let background = getContext("background");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0)
    $$bindings.custom(custom);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing2 !== void 0)
    $$bindings.spacing(spacing2);
  return `${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: labelClass(inline, $$props.class),
      show: !!$$slots.default
    },
    {},
    {
      default: () => {
        return `<input${spread(
          [
            { type: "checkbox" },
            { value: escape_attribute_value(value) },
            escape_object($$restProps),
            {
              class: escape_attribute_value(twMerge(spacing2, inputClass(custom, color, true, background, $$slots.default || $$props.class)))
            }
          ],
          {}
        )}${add_attribute("checked", checked, 1)}>${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}

`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = null;
  let google_signed;
  let type = "password";
  return `<div class="p-7"><div class="my-7"><h1 class="font-bold text-lg">Welcome Back!</h1>
    <span class="text-gray-500 text-sm">Enter your username and password to conitnue!</span></div>
  ${``}
  <form action="post"${add_attribute("this", form, 0)}><div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2"
    },
    {},
    {
      default: () => {
        return `Username`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
      required: true
    },
    {},
    {
      left: () => {
        return `${validate_component(Mail, "Mail").$$render(
          $$result,
          {
            slot: "left",
            class: "w-5 h-5 text-gray-500 dark:text-gray-400"
          },
          {},
          {}
        )}`;
      }
    }
  )}</div>
    <div class="mb-6">
      ${validate_component(Label, "Label").$$render($$result, { for: "password", class: "block mb-2 " }, {}, {
    default: () => {
      return `Password`;
    }
  })}
      <div class="relative">${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: type,
      type,
      placeholder: "Enter your password",
      required: true
    },
    {},
    {
      left: () => {
        return `${validate_component(Password, "Password").$$render(
          $$result,
          {
            slot: "left",
            "aria-hidden": "true",
            class: "w-5 h-5 text-gray-500 dark:text-gray-400"
          },
          {},
          {}
        )}`;
      }
    }
  )}
    <div class="absolute top-1 right-3">${`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`}</div></div></div>
    <div class="flex justify-between my-6">${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
    default: () => {
      return `Remember me`;
    }
  })}</div>
    ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "w-full",
      color: "primary",
      type: "submit",
      disabled: google_signed
    },
    {},
    {
      default: () => {
        return `Sign In${``}`;
      }
    }
  )}</form>

  <div class="text-center my-7 text-sm">Don&#39;t have an account? <a href="/register" class="text-primary-500">Register</a></div></div>`;
});
export {
  Page as default
};
