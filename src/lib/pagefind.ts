import * as pagefind from "pagefind";
import type { CollectionEntry, DataEntry } from "astro:content"

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
				title: app.data.name,
				description: app.data.description || ""
			},
			language: "en"
		})
	}

	await index.writeFiles({
		outputPath: "dist/pagefind"
	})
}