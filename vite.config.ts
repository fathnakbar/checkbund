import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindConfig from './tailwind.config';

export default defineConfig({
  plugins: [sveltekit()]
});
