import * as universal from '../entries/pages/_layout.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.ea5bfe8d.js","_app/immutable/chunks/index.7f6451f6.js","_app/immutable/chunks/client.8bb51adb.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/sdk.ad0b6e3c.js","_app/immutable/chunks/singletons.ad1b40ec.js"];
export const stylesheets = ["_app/immutable/assets/app.0cf58466.css"];
export const fonts = [];
