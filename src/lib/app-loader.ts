import fs from "node:fs/promises";
import fg from "fast-glob";
import { z } from "astro:content"
import { CATEGORIES } from "./categories";
import { parseFromString } from "dom-parser";
import type { WebAppManifest } from "web-app-manifest";

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

const getIcon = async (manifestUrl: string, manifest: WebAppManifest): Promise<string | null> => {
	if (!manifest.icons) {
		return null;
	}
	// Remove the file part from the manifest URL to get the parent URL
	const manifestSplit = manifestUrl.split("/");
	manifestSplit.pop();
	const manifestParent = manifestSplit.join("/") + "/";

	// Helper to compute the icon's highest resolution from its sizes property.
	// If sizes is "512x512 192x192", it returns the highest area computed.
	const getResolution = (icon: { sizes?: string }): number => {
		if (!icon.sizes) return 0;
		return icon.sizes.split(" ").reduce((max, sizeStr) => {
			const [w, h] = sizeStr.split("x").map(Number);
			const area = (w || 0) * (h || 0);
			return Math.max(max, area);
		}, 0);
	};

	// Helper function to check if an icon's URL responds with a valid response.
	const tryIcon = async (icon: { src: string }): Promise<string | null> => {
		const iconUrl = new URL(icon.src, manifestParent).href;
		try {
			const res = await fetch(iconUrl, { method: "GET" });
			if (res.ok) {
				return iconUrl;
			}
		} catch {}
		return null;
	};

	// Filter icons into categories based on file type and "maskable" purpose.
	const maskableIcons = manifest.icons.filter(
		(icon) => icon.purpose?.includes("maskable")
	);
	const pngIcons = manifest.icons.filter((icon) =>
		icon.src.replace(/\?.*/, "").endsWith(".png")
	);
	const jpgIcons = manifest.icons.filter((icon) => {
		const src = icon.src.replace(/\?.*/, "").toLowerCase();
		return src.endsWith(".jpg") || src.endsWith(".jpeg");
	});
	const svgIcons = manifest.icons.filter((icon) =>
		icon.src.replace(/\?.*/, "").endsWith(".svg")
	);

	// Helper to sort icons by resolution and try them in order.
	const trySortedIcons = async (icons: Array<{ src: string; sizes?: string }>): Promise<string | null> => {
		const sorted = icons.sort((a, b) => getResolution(b) - getResolution(a));
		for (const icon of sorted) {
			const result = await tryIcon(icon);
			if (result) return result;
		}
		return null;
	};

	// Try icons in the following priority: maskable, png, jpg, then svg.
	for (const group of [maskableIcons, pngIcons, jpgIcons, svgIcons]) {
		const result = await trySortedIcons(group);
		if (result) return result;
	}

	return null;
};

const getScreenshots = async (manifestUrl: string, manifest: WebAppManifest): Promise<string[]> => {
	const manifestSplit = manifestUrl.split("/");
	manifestSplit.pop();
	const manifestParent = manifestSplit.join("/") + "/";
	const screenshots = manifest.screenshots || [];
	return await Promise.all(screenshots.map(async (screenshot) => {
		let url = new URL(screenshot.src, manifestParent).href;

		return url;
	}));
}

const getMetaTags = async (url: string): Promise<Pick<z.infer<typeof AppSchema>, "description" | "cover" | "manifestUrl"> | null> => {
	const pageBody = await fetch(url, {
		method: "GET",
		headers: {
			accept: "text/html"
		}
	}).catch(() => null);

	if (!pageBody || !pageBody.ok) {
		console.error("App with ", url, " url could not be fetched.");
		return null;
	}

	const pageHead = (await pageBody.text()).match(/<head[^>]*>([\s\S.]*)<\/head>/i)?.[0] || "";
	const parsedPageBody = parseFromString(pageHead);

	let manifestLink = parsedPageBody.getElementsByAttribute("rel", "manifest")[0];
	let descriptionMeta = parsedPageBody.getElementsByAttribute("name", "description")[0];
	let coverMeta = parsedPageBody.getElementsByAttribute("property", "og:image")[0];

	return {
		description: descriptionMeta?.getAttribute("content"),
		manifestUrl: new URL(manifestLink?.getAttribute("href"), url).href,
		cover: coverMeta ? new URL(coverMeta.getAttribute("content"), url).href : undefined
	}
}

export const AppSchema = z.object({
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

export const AppSpecSchema = z.object({
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


export const appDataLoader = async (): Promise<Array<z.infer<typeof AppSchema>>> => {
	const entries = await fg("./apps/*.json", { dot: false, absolute: true });
	const appSpecFiles = entries.map((p) => {
		return fs.readFile(p);
	}).filter((s) => s !== null);
	const appSpecs = await Promise.all(appSpecFiles.map(async (file) => {
		try {
			const parsed = JSON.parse((await file).toString());
			return AppSpecSchema.parse(parsed);
		} catch(e) {
			console.error("Could not add", (await file))
			return null
		}
	})).then((r) => r.filter((s) => s !== null));
	const apps = [];


	for await (const spec of appSpecs) {
		const data = await appDataFetcher(spec).catch((err) => {
			console.error("App ", spec.id, " error: ", err);
			return null;
		});

		if (data !== null) apps.push(data);
	}

	return apps;
}

export const appDataFetcher = async (spec: z.infer<typeof AppSpecSchema>): Promise<z.infer<typeof AppSchema> | null> => {
	let manifest: WebAppManifest;
	const metaTags = await getMetaTags(spec.url);
	if (!metaTags) {
		console.error("App ", spec.id, " meta tags could not be fetched.");
		return null;
	}

	let manifestUrl: string | undefined = spec.manifestUrl || metaTags.manifestUrl;

	manifest = await fetch(manifestUrl, {
		method: "GET",
		headers: {
			accept: "application/manifest+json"
		}
	}).then(res => res.json()).catch(() => null);

	if (!manifest) {
		console.error("App ", spec.id, " manifest could not be fetched.");
		return null;
	}

	const icon = await getIcon(manifestUrl, manifest);

	if (!icon) {
		console.error("App ", spec.id, " could not fetch a favorable icon.");
		return null;
	}

	const screenshots = await getScreenshots(manifestUrl, manifest);

	if (!screenshots) {
		console.warn("App ", spec.id, " could not fetch screenshots.");
	}

	const sortedCategories = manifest.categories?.filter((c) => CATEGORIES.map(category => [category.id, ...(category.aliases)]).flat().includes(c as unknown as any));

	const appData: z.infer<typeof AppSchema> = {
		id: spec.id,
		name: manifest.name || manifest.short_name || "",
		author: spec.author,
		categories: sortedCategories as typeof spec.categories || spec.categories || [],
		features: spec.features,
		icon: icon,
		manifestUrl: manifestUrl,
		url: spec.url,
		accentColor: manifest.theme_color || "#212121",
		screenshots: screenshots,
		gitlabUrl: spec.gitlabUrl,
		githubUrl: spec.githubUrl,
		description: metaTags.description,
		cover: metaTags.cover,
		authorUrl: spec.authorUrl
	}

	return AppSchema.parse(appData);
}
