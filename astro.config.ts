// @ts-check
import mdx from "@astrojs/mdx";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import astropwa from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkGemoji from "remark-gemoji";


// https://astro.build/config
export default defineConfig({
	integrations: [
		astropwa({
			manifest: false,
			base: "/",
			scope: "/",
			outDir: "./dist/client",
			registerType: "prompt",
			strategies: "generateSW",
			injectRegister: null,
			workbox: {
				navigationPreload: false,
				globPatterns: [
					"_astro/*.{js,woff,woff2}",
					"**/*.{png,css}",
					"home/index.html",
					"manifest.json",
					"offline/index.html",
					"app/**/index.html",
				],
				disableDevLogs: true,
				globDirectory: "./dist/client"
			},
			devOptions: {
				enabled: false
			}
		}),
		react(),
		mdx()
	],

	site: "https://paquet.m4.rocks",

	experimental: {
		incrementalBuild: true
	},

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
		processor: unified({
			remarkPlugins: [remarkGemoji]
		})
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

	adapter: vercel({
		webAnalytics: {
      		enabled: true,
    	},
	}),
});
