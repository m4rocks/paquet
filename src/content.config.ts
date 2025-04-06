import { defineCollection } from "astro:content";
import { appDataLoader, AppSchema } from "./lib/app-loader";

const apps = defineCollection({
	loader: appDataLoader,
	schema: AppSchema
});

export const collections = { apps }
