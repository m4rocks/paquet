import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { CATEGORIES } from "./lib/categories";

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

const apps = defineCollection({
	loader: glob({ pattern: "*.json", base: "./apps" }),
	schema: z.object({
		id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
		url: z.string().url(),
		manifestUrl: z.string().url().optional(),
		features: z.array(z.enum(["openSource", "mobile", "desktop", "auth", "offline"])),
		githubUrl: z.string().url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
		gitlabUrl: z.string().url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),
		categories: z.array(z.enum(zodEnum(CATEGORIES.map(category => [category.id, ...(category.aliases || [])]).flat()))),
		author: z.string().min(1).max(30),
		authorUrl: z.string().url().optional(),
		accentColor: z.string().optional(),
	})
})

export const collections = { apps }
