import { z, type CollectionEntry } from "astro:content"
import { CATEGORIES } from "./categories";

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

export const AppSchema = z.object({
	id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
	name: z.string().min(1).max(30),
	description: z.string().min(10).max(200).optional(),

	url: z.string().url(),

	categories: z.array(z.enum(zodEnum(CATEGORIES.map(category => [category.id, ...(category.aliases || [])]).flat()))),
	features: z.array(z.enum(["openSource", "mobile", "desktop", "auth", "offline"])),

	author: z.string().min(1).max(30),
	authorUrl: z.string().url().optional(),

	githubUrl: z.string().url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
	gitlabUrl: z.string().url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),

	manifestUrl: z.string().url(),
	icon: z.object({
		src: z.string().url(),
		alt: z.string()
	}),
	screenshots: z.array(z.object({
		src: z.string().url(),
		alt: z.string()
	})).optional(),

	cover: z.object({
		src: z.string().url(),
		alt: z.string()
	}).optional(),

	accentColor: z.string().optional(),
})

export const AppSpecSchema = z.object({
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

export const appDataLoader = async (): Promise<Array<typeof AppSchema._type>> => {
	return [];
}

export const appDataFetcher = async (spec: CollectionEntry<"appSpecs">) => {

}
