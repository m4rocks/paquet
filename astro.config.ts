// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import astropwa from "@vite-pwa/astro";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import remarkGemoji from "remark-gemoji";
import { Pi } from "lucide-react";


// https://astro.build/config
export default defineConfig({
	output: "static",
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
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		},
		imageService: "passthrough",
	}),
});
