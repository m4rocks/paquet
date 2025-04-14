import { defineCollection, z } from "astro:content";
import { appLoader } from "./lib/app-loader";
import { glob } from "astro/loaders";

const apps = defineCollection({
	loader: appLoader
});

const docs = defineCollection({
	loader: glob({ base: "./docs", pattern: "*.mdx" }),
	schema: z.object({
		title: z.string()
	})
})

export const collections = { apps, docs }
