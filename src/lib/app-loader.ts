import fs from "node:fs/promises";
import fg from "fast-glob";
import { z } from "astro:content"
import { categories } from "./categories";
import { parseFromString } from "dom-parser";
import type { WebAppManifest } from "web-app-manifest";
import { appSchema, appSpecSchema } from "./app-schema";
import type { Loader } from "astro/loaders";
import { buildSearchIndex } from "./pagefind";


const addTrailingSlash = (url: string) => new URL(url).href.replace(/\/?$/, '/');

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

const getAccentColor = (str: string) => {
	const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
	if (hexRegex.test(str)) {
		if (str.length === 4) {
			return '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
		}
		return str;
	}
	return null;
};

const getScreenshots = async (manifestUrl: string, manifest: WebAppManifest): Promise<string[]> => {
	const manifestSplit = manifestUrl.split("/");
	manifestSplit.pop();
	const manifestParent = manifestSplit.join("/") + "/";
	const screenshots = manifest.screenshots?.splice(0, 10) || [];
	return (await Promise.all(screenshots.map(async (screenshot) => {
		let url = new URL(screenshot.src, manifestParent).href;

		const res = await fetch(url).then((res) => res.ok).catch(() => false);

		if (res) {
			return url;
		} else {
			return null;
		}
	}))).filter((r) => r !== null);
}

const getMetaTags = async (url: string): Promise<Pick<z.infer<typeof appSchema>, "description" | "cover" | "manifestUrl"> | null> => {
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


	const coverRes = coverMeta ? await fetch(new URL(coverMeta.getAttribute("content").replace("./", ""), addTrailingSlash(url))).then((r) => r.ok).catch((r) => false) : false;

	return {
		description: descriptionMeta?.getAttribute("content"),
		manifestUrl: new URL(manifestLink?.getAttribute("href"), addTrailingSlash(url)).href,
		cover: (coverMeta !== undefined && coverRes) ? new URL(coverMeta.getAttribute("content").replace("./", ""), addTrailingSlash(url)).href : undefined
	}
}

export const appLoader: Loader = {
	name: "PaquetAppLoader",
	schema: appSchema,
	load: async ({ store, parseData, generateDigest }) => {
		const entries = await fg("./apps/*.json", { dot: false, absolute: true });
		const appSpecFiles = entries.map((p) => {
			return fs.readFile(p);
		}).filter((s) => s !== null);
		const appSpecs = await Promise.all(appSpecFiles.map(async (file) => {
			try {
				const parsed = JSON.parse((await file).toString());
				return appSpecSchema.parse(parsed);
			} catch(e) {
				console.error("Could not add", (await file))
				return null
			}
		})).then((r) => r.filter((s) => s !== null));

		for (const entry of store.entries()) {
			if (!appSpecs.map((s) => s.id).includes(entry[0])) {
				store.delete(entry[0]);
			}
		}

		for await (const spec of appSpecs) {
			if (!process.env.NOCACHE && (store.get(spec.id)?.digest === generateDigest(spec))) continue;

			const rawData = await appDataFetcher(spec).catch((err) => {
				console.error("App ", spec.id, " error: ", err);
				return null;
			});

			if (rawData === null) continue;

			const data = await parseData({
				id: spec.id,
				data: rawData
			})

			const specDigest = generateDigest(spec);

			store.set({
				id: spec.id,
				data,
				digest: specDigest
			})
		}

		buildSearchIndex(store.entries())
	}
}


export const appDataFetcher = async (spec: z.infer<typeof appSpecSchema>): Promise<z.infer<typeof appSchema> | null> => {
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
			accept: "application/json"
		}
	}).then(res => res.json()).catch(() => null);

	if (!manifest) {
		console.error("App", spec.id, "manifest could not be fetched.");
		return null;
	}

	const icon = await getIcon(manifestUrl, manifest);

	if (!icon) {
		console.error("App", spec.id, "could not fetch a favorable icon.");
		return null;
	}

	const screenshots = await getScreenshots(manifestUrl, manifest);

	if (!screenshots) {
		console.warn("App", spec.id, "could not fetch screenshots.");
	}

	const appCategories: string[] = manifest.categories as string[] || spec.categories as string[] || [];

	if (appCategories.length === 0) {
		console.error("App", spec.id, "does not have categories")
		return null;
	}

	const sortedCategories: Exclude<typeof spec.categories, undefined> = [];

	appCategories.forEach((category) => {
		const foundCategory = categories.find((c) => {
			return c.id === category || (c.aliases as string[]).includes(category);
		});

		if (foundCategory) {
			if (!sortedCategories.includes(foundCategory.id)) {
				sortedCategories.push(foundCategory.id);
			}
		}
	});

	if (!sortedCategories) {
		console.error("App", spec.id, "does not have appropiate categories");
		return null;
	}

	const appData: z.infer<typeof appSchema> = {
		id: spec.id,
		name: manifest.name || manifest.short_name || "",
		author: spec.author,
		categories: sortedCategories,
		features: spec.features,
		icon: icon,
		manifestUrl: manifestUrl,
		url: spec.url,
		accentColor: getAccentColor(spec.accentColor || "") || getAccentColor(manifest.theme_color || "") || "#212121",
		screenshots: screenshots,
		gitlabUrl: spec.gitlabUrl,
		githubUrl: spec.githubUrl,
		description: metaTags.description,
		cover: metaTags.cover,
		authorUrl: spec.authorUrl
	}

	return appSchema.parse(appData);
}
