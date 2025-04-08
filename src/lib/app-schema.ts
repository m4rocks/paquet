import { z } from "astro/zod"
import { CATEGORIES } from "./categories";

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

export const appSchema = z.object({
	id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
	name: z.string().min(1).max(30),
	description: z.string().min(10).max(500).optional(),

	url: z.string().url(),

	categories: z.array(z.enum(zodEnum(CATEGORIES.map(category => [category.id, ...(category.aliases)]).flat()))),
	features: z.array(z.enum(["openSource", "mobile", "desktop", "auth", "offline"])),

	author: z.string().min(1).max(30),
	authorUrl: z.string().url().optional(),

	githubUrl: z.string().url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
	gitlabUrl: z.string().url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),

	manifestUrl: z.string().url(),
	icon: z.string().url(),
	screenshots: z.array(z.string().url()).optional(),

	cover: z.string().url().optional(),

	accentColor: z.string().optional(),
})

export const appSpecSchema = z.object({
	$schema: z.string(),
	id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
	url: z.string().url(),
	manifestUrl: z.string().url().optional(),
	features: z.array(z.enum(["openSource", "mobile", "desktop", "auth", "offline"])),
	githubUrl: z.string().url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
	gitlabUrl: z.string().url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),
	categories: z.array(z.enum(zodEnum(CATEGORIES.map(category => [category.id, ...(category.aliases)]).flat()))).optional(),
	author: z.string().min(1).max(30),
	authorUrl: z.string().url().optional(),
	accentColor: z.string().optional(),
})