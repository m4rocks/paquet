// @ts-check
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import astropwa from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import remarkGemoji from "remark-gemoji";


// https://astro.build/config
export default defineConfig({
	integrations: [
		astropwa({
			manifest: false,
			base: "/",
			scope: "/",
			registerType: "prompt",
			strategies: "generateSW",
			workbox: {
				navigationPreload: false,
				globPatterns: [
					"_astro/*.{js,woff,woff2}",
					"**/*.{png,css}",
					"home.html",
					"manifest.json",
					"offline.html",
					"app/*.html",
				],
				disableDevLogs: true
			},
			devOptions: {
				enabled: false
			}
		}),
		react(),
		mdx()
	],

	site: "https://paquet.m4.rocks",

	server: {
		port: 3000
	},

	image: {
		remotePatterns: [{ protocol: "https" }]
	},

	build: {
		format: "file"
	},

	trailingSlash: "never",

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

	adapter: vercel(),
});
