import * as universal from '../entries/pages/_layout.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.f711bd4d.js","_app/immutable/chunks/index.03fbab45.js","_app/immutable/chunks/client.174da6be.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/singletons.86129028.js"];
export const stylesheets = ["_app/immutable/assets/0.81839434.css"];
export const fonts = [];