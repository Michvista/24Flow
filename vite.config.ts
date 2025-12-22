import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		// This forces Vite to process svelte-sonner properly during SSR
		noExternal: ['svelte-sonner']
	}
});
