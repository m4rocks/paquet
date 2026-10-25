import { z } from "astro/zod"
import { categories } from "./categories";

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

export const appSchema = z.object({
	id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
	name: z.string().min(1).max(30),
	description: z.string().min(10).max(500).optional(),

	url: z.url(),

	categories: z.array(z.enum(zodEnum(categories.map(category => [category.id, ...(category.aliases)]).flat()))),
	features: z.array(z.enum(["open-source", "mobile", "desktop", "auth", "offline", "data-collection"])),

	author: z.string().min(1).max(30),
	authorUrl: z.url().optional(),

	githubUrl: z.url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
	gitlabUrl: z.url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),
	syncGitHubReleases: z.boolean(),

	playStoreUrl: z.url().startsWith("https://play.google.com/store/apps/", "playStoreUrl should start with https://play.google.com/store/apps/").optional(),
	appStoreUrl: z.url().startsWith("https://apps.apple.com/", "appStoreUrl should start with https://apps.apple.com/").optional(),

	privacyPolicyUrl: z.url().optional(),
	termsAndConditionsUrl: z.url().optional(),

	manifestUrl: z.url(),
	icon: z.url(),
	screenshots: z.array(z.url()).optional(),

	cover: z.url().optional(),

	accentColor: z.string(),
})

export const appSpecSchema = z.object({
	$schema: z.string(),
	id: z.string().min(1).max(50).regex(/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/),
	url: z.url(),
	manifestUrl: z.url().optional(),
	features: z.array(z.enum(["open-source", "mobile", "desktop", "auth", "offline", "data-collection"])),
	
	githubUrl: z.url().startsWith("https://github.com/", "githubUrl should start with https://github.com/").optional(),
	gitlabUrl: z.url().startsWith("https://gitlab.com/", "gitlabUrl should start with https://gitlab.com/").optional(),
	syncGitHubReleases: z.boolean().optional(),

	playStoreUrl: z.url().startsWith("https://play.google.com/store/apps/", "playStoreUrl should start with https://play.google.com/store/apps/").optional(),
	appStoreUrl: z.url().startsWith("https://apps.apple.com/", "appStoreUrl should start with https://apps.apple.com/").optional(),

	privacyPolicyUrl: z.url().optional(),
	termsAndConditionsUrl: z.url().optional(),
	
	categories: z.array(z.enum(zodEnum(categories.map(category => [category.id, ...(category.aliases)]).flat()))).optional(),
	author: z.string().min(1).max(30),
	authorUrl: z.url().optional(),

	accentColor: z.string().optional(),
	updatedDate: z.iso.date()
})
