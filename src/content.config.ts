import { defineCollection } from "astro:content";
import { appDataLoader, appSchema } from "./lib/app-loader";

const apps = defineCollection({
	loader: appDataLoader,
	schema: appSchema
});

export const collections = { apps }
