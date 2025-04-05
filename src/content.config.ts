import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { CATEGORIES } from "./lib/categories";
import { appDataLoader, AppSpecSchema, AppSchema } from "./lib/app-loader";

const appSpecs = defineCollection({
	loader: glob({ pattern: "*.json", base: "./apps" }),
	schema: AppSpecSchema
});

const apps = defineCollection({
	loader: appDataLoader,
	schema: AppSchema
});

export const collections = { appSpecs, apps }
