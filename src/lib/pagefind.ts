import * as pagefind from "pagefind";
import type { CollectionEntry, DataEntry } from "astro:content"

export interface PagefindSearchResultData {
	url: string,
	meta: {
		id: string,
		title: string,
	}
}

export interface PagefindSearch {
	results: {
		id: string,
		data: () => Promise<PagefindSearchResultData>
	}[]
}

export interface PagefindClient {
	init: () => void,
	/// Needs further implementation
	options: () => Promise<void>
	search: (str: string) => Promise<PagefindSearch>
	debouncedSearch: (str: string, {}, timeout: number) => Promise<PagefindSearch>
}

export const buildSearchIndex = async (entries: [id: string, DataEntry][]) => {
	// This function should only work at build time after syncing content collections
	if (!import.meta.env.BUILD) return;

	const { index } = await pagefind.createIndex()

	if (!index) {
		console.error("Failed to create index");
		return;
	}

	for (const entry of entries) {
		const app = (entry[1] as CollectionEntry<"apps">);

		index.addCustomRecord({
			url: `/app/${entry[0]}`,
			content: app.data.name,
			meta: {
				id: app.id,
				title: app.data.name,
			},
			language: "en"
		})
	}

	// Written to public/ so Astro copies the index into the client output, which is what the
	// adapter deploys; dist/ is cleared at the start of the build and is not what gets served.
	await index.writeFiles({
		outputPath: "public/pagefind"
	})
}
