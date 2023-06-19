import { c as create_ssr_component, f as compute_rest_props, h as spread, j as escape_object, d as add_attribute, v as validate_component, l as globals } from "../../../chunks/index.js";
import { B as Button } from "../../../chunks/Button.js";
/* empty css                                                       */import { L as Label, I as Input, M as Mail, P as Password } from "../../../chunks/mail.js";
import "../../../chunks/client.js";
import "@capacitor/preferences";
const Call = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps),
      { viewBox: "0 0 24 24" },
      { fill: "currentColor" }
    ],
    {}
  )}><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z"></path></svg>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$restProps),
      { viewBox: "0 0 24 24" },
      { fill: "currentColor" }
    ],
    {}
  )}><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"></path></svg>`;
});
const Stetoscope = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 -960 960 960" },
      { fill: "currentColor" },
      escape_object($$restProps)
    ],
    {}
  )}><path d="M540-81q-112 0-186-78.5T280-347v-35q-85-11-142.5-75.711T80-610v-230h120v-40h60v140h-60v-40h-60v169.677Q140-539 189.5-489.5T310-440q71 0 120.5-49.5T480-610.323V-780h-60v40h-60v-140h60v40h120v230q0 87.578-57.5 152.289Q425-393 340-382v35q0 85 56.5 145.5T540-141q81 0 140.5-60.152T740-347.235V-424q-35-10-57.5-39T660-530q0-45.833 32.118-77.917 32.117-32.083 78-32.083Q816-640 848-607.917q32 32.084 32 77.917 0 38-22.5 67T800-424v77q0 111-76.5 188.5T540-81Zm229.825-399Q791-480 805.5-494.325q14.5-14.324 14.5-35.5Q820-551 805.675-565.5q-14.324-14.5-35.5-14.5Q749-580 734.5-565.675q-14.5 14.324-14.5 35.5Q720-509 734.325-494.5q14.324 14.5 35.5 14.5Zm.175-50Z"></path></svg>`;
});
const Women = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "currentColor" },
      escape_object($$restProps),
      { viewBox: "0 -960 960 960" }
    ],
    {}
  )}><path d="M411-80v-180h-91v-314q0-50 28-78t77.5-28q49.5 0 76 33t26.5 73q52 6 82 41.5t30 89.5v183H485v180h-74Zm15.08-654q-30.08 0-51.58-21.42-21.5-21.421-21.5-51.5 0-30.08 21.42-51.58 21.421-21.5 51.5-21.5 30.08 0 51.58 21.42 21.5 21.421 21.5 51.5 0 30.08-21.42 51.58-21.421 21.5-51.5 21.5Z"></path></svg>`;
});
const { Object: Object_1 } = globals;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let confirm_hint;
  let password_hint;
  let role = null;
  let form = null;
  let roleContainer = null;
  let submitted = false;
  confirm_hint = void 0;
  password_hint = void 0;
  return `<div class="p-7"><div class="my-7"><h1 class="font-bold text-lg">Create Account</h1>
    <span class="text-gray-500 text-sm">Join the Checkbund community today!</span></div>
  <form${add_attribute("this", form, 0)}><div class="mb-6 pt-5"${add_attribute("this", roleContainer, 0)}><input type="text" name="role" class="hidden"${add_attribute("value", role, 0)}>
      ${validate_component(Label, "Label").$$render(
    $$result,
    {
      class: `block mb-3 relative ${submitted}`
    },
    {},
    {
      default: () => {
        return `Siapakah anda?`;
      }
    }
  )}
      ${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "light"
    },
    {},
    {
      default: () => {
        return `${validate_component(Stetoscope, "Stetoscope").$$render($$result, { class: "w-5 h-5" }, {}, {})}Bidan`;
      }
    }
  )}
      ${validate_component(Button, "Button").$$render(
    $$result,
    {
      color: "light"
    },
    {},
    {
      default: () => {
        return `${validate_component(Women, "Women").$$render($$result, { class: "w-5 h-5" }, {}, {})}Ibu Hamil`;
      }
    }
  )}
      ${``}</div>
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2"
    },
    {},
    {
      default: () => {
        return `Nama Lengkap`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "name",
      type: "text",
      placeholder: "cth: Gadila Asa Penjuru",
      required: true
    },
    {},
    {}
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
        return `Email`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "email",
      type: "email",
      placeholder: "cth: contoh@gmail.com",
      required: true
    },
    {},
    {
      left: () => {
        return `${validate_component(Mail, "Mail").$$render(
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
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2"
    },
    {},
    {
      default: () => {
        return `Nomor Telpon`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      name: "phone",
      type: "number",
      placeholder: "cth: 086381142522",
      required: true
    },
    {},
    {
      left: () => {
        return `${validate_component(Call, "Call").$$render(
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
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2"
    },
    {},
    {
      default: () => {
        return `Alamat Lengkap`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render(
    $$result,
    {
      type: "text",
      name: "address",
      placeholder: "cth: Dayeuhkolot, Bandung, Jawa Barat",
      required: "true"
    },
    {},
    {
      left: () => {
        return `${validate_component(Home, "Home").$$render(
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
    ${``}
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2",
      color: password_hint
    },
    {},
    {
      default: () => {
        return `Password`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render($$result, Object_1.assign({}, { type: "password" }, { name: "password" }, { placeholder: "Enter your password" }, { color: password_hint }, { required: true }), {}, {
    left: () => {
      return `${validate_component(Password, "Password").$$render(
        $$result,
        {
          slot: "left",
          "aria-hidden": "true",
          class: `w-5 h-5 text-${password_hint || "grey"}-500 dark:text-${password_hint || "grey"}-400`
        },
        {},
        {}
      )}`;
    }
  })}
      ${``}</div>
    <div class="mb-6">${validate_component(Label, "Label").$$render(
    $$result,
    {
      for: "input-group-1",
      class: "block mb-2",
      color: confirm_hint
    },
    {},
    {
      default: () => {
        return `Confirm Password`;
      }
    }
  )}
      ${validate_component(Input, "Input").$$render($$result, Object_1.assign({}, { type: "password" }, { name: "confirm" }, { placeholder: "Re-enter your password" }, { color: confirm_hint }, { required: true }), {}, {
    left: () => {
      return `${validate_component(Password, "Password").$$render(
        $$result,
        {
          slot: "left",
          "aria-hidden": "true",
          class: `w-5 h-5 text-${confirm_hint || "grey"}-500 dark:text-${confirm_hint || "grey"}-400`
        },
        {},
        {}
      )}`;
    }
  })}
      ${``}</div>

    
    ${validate_component(Button, "Button").$$render($$result, { class: "w-full mt-7", type: "submit" }, {}, {
    default: () => {
      return `Sign Up ${``}`;
    }
  })}</form>

  <div class="text-center my-7 text-sm">Already have an account? <a href="/login" class="text-primary-500 font-bold">Login</a></div>
  <br>
  <br>
  <br></div>`;
});
export {
  Page as default
};
