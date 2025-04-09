import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";
import { getCollection, getEntry } from "astro:content";

export const prerender = true;
const sizes = {
	small: {
		width: 85,
		height: 50
	},
	medium: {
		width: 680,
		height: 400
	},
	large: {
		width: 1024,
		height: 600
	}
} as const;

export const getStaticPaths: GetStaticPaths = async () => {
	const apps = await getCollection("apps", (e) => !!e.data.cover);

	let paths: { params: { id: string, size: keyof typeof sizes }}[] = []

	for (const a of apps) {
		for (const s of Object.keys(sizes)) {
			paths.push({ params: { id: a.id, size: s as keyof typeof sizes } })
		}
	}

	return paths;
}  

export const GET: APIRoute = async (ctx) => {
	const id = ctx.params.id;
	const size = ctx.params.size as keyof typeof sizes;
	if (!id) return new Response(null);
	if (!size || !Object.keys(sizes).includes(size)) return new Response(null);

	const app = await getEntry("apps", id);
	if (!app) return new Response(null);

	const originalImage = await fetch(new URL(app.data.cover!), {
		method: "GET"
	});

	const processedImage = await sharp(await originalImage.arrayBuffer())
		.resize(sizes[size].width, sizes[size].height)
		.webp()
		.toBuffer()
		.catch(() => {
			console.error("Failed to process cover of", id);
			return null;
		})

	if (!processedImage) return new Response(null);

	return new Response(processedImage, {
		headers: {
			"Content-Type": "image/webp"
		}
	});
}