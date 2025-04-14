// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import astropwa from "@vite-pwa/astro";
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import remarkGemoji from "remark-gemoji";


// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [astropwa({
		manifest: false,
		base: "/",
		scope: "/",
		registerType: "prompt",
		strategies: "generateSW",
		injectRegister: false,
		workbox: {
			navigationPreload: true,
			navigateFallback: "/",
			globPatterns: [
				"_astro/*.{js,woff,woff2}",
				"*.png",
				"splash_screens/*.png",
			],
			runtimeCaching: [
				{
					urlPattern: "/app/*",
					method: "GET",
					handler: "StaleWhileRevalidate",
					options: {
						cacheName: "app-pages-cache",
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 60 * 60 * 24 // For 1 day
						},
						cacheableResponse: {
							statuses: [0, 200]
						}
					}
				}
			]
		},
		devOptions: {
			enabled: true,
			navigateFallbackAllowlist: [/^\/$/]
		}
	}), react(), mdx()],
	site: "https://paquet.m4.rocks",
	server: {
		port: 3000
	},
	image: {
		remotePatterns: [{ protocol: "https" }]
	},
	markdown: {
		remarkPlugins: [remarkGemoji]
	},
	prefetch: {
		defaultStrategy: "viewport",
		prefetchAll: true
	},

	vite: {
		plugins: [tailwindcss()],
		resolve: {
			// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
			// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
			alias: process.env.BUILD ? {
				"react-dom/server": "react-dom/server.edge",
			} : {},
		},
	},

	adapter: cloudflare({
		platformProxy: {
			enabled: true
		},
		imageService: "passthrough",
	}),
});
