// @ts-check
import { defineConfig } from 'astro/config';

import fs from "node:fs/promises";
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import zodToJsonSchema from 'zod-to-json-schema';
import { appSpecSchema } from './src/lib/app-schema';

// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [react()],
	server: {
		port: 3000
	},
	image: {
		remotePatterns: [{ protocol: "https" }]
	},

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			alias: import.meta.env.PROD ? {
				"react-dom/server": "react-dom/server.edge",
			} : {},
		},
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

if (import.meta.env.PROD) {
	console.log("Building Schema");
	const appJsonSchema = zodToJsonSchema(appSpecSchema, {
		name: "appSpec",
	});

	await fs.writeFile("app-spec-schema.json", JSON.stringify(appJsonSchema));
}