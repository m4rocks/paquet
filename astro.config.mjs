// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [react()],
	server: {
		port: 3000
	},

	vite: {
		plugins: [tailwindcss()]
	},

	adapter: cloudflare({
		platformProxy: {
			enabled: true
		},
		imageService: "compile",
	}),

	experimental: {
		contentIntellisense: true
	}
});
