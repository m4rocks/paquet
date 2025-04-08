import { defineCollection } from "astro:content";
import { appLoader } from "./lib/app-loader";

const apps = defineCollection({
	loader: appLoader
});

export const collections = { apps }
