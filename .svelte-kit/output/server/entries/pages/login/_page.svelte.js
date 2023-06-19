import { c as create_ssr_component, f as compute_rest_props, g as getContext, v as validate_component, h as spread, i as escape_attribute_value, j as escape_object, d as add_attribute, k as compute_slots } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */import { twMerge } from "tailwind-merge";
import { L as Label, I as Input, M as Mail, P as Password } from "../../../chunks/mail.js";
import "../../../chunks/client.js";
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
const Google = "/_app/immutable/assets/google.0aa569c2.png";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = null;
  let signed;
  let google_signed;
  return `<div class="p-7"><div class="my-7"><h1 class="font-bold text-lg">Welcome Back!</h1>
    <span class="text-gray-500 text-sm">Enter your username and password to conitnue!</span></div>
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
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2"
    },
    {},
    {
      default: () => {
        return `Password`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "password",
      type: "password",
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
  )}</div>
    <div class="flex justify-between my-6">${validate_component(Checkbox, "Checkbox").$$render($$result, {}, {}, {
    default: () => {
      return `Remember me`;
    }
  })}
      <a href="/forgot_password" class="text-sm text-primary-500">Forgot password?</a></div>
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
  <div class="text-center text-gray-500 text-sm my-3">or</div>
  ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "w-full",
      color: "light",
      disabled: signed
    },
    {},
    {
      default: () => {
        return `<img${add_attribute("src", Google, 0)} alt="google icon" width="24" class="mx-2"> Sign in with Google ${``}`;
      }
    }
  )}

  <div class="text-center my-7 text-sm">Don&#39;t have an account? <a href="/register" class="text-primary-500">Register</a></div>
</div>`;
});
export {
  Page as default
};
