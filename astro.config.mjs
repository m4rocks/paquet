// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import remarkGemoji from "remark-gemoji";


import mdx from "@astrojs/mdx";


// https://astro.build/config
export default defineConfig({
    output: "static",
    integrations: [react(), mdx()],
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