import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";
import { getCollection, getEntry } from "astro:content";
import { decodeResourceUrl, iconSizes as sizes } from "@/lib/images";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
	if (import.meta.env.NORESOURCES) return [];
	
	const apps = await getCollection("apps");

	return apps.map((a) => ({
		params: { id: a.id }
	}))
}  

export const GET: APIRoute = async (ctx) => {
	const id = ctx.params.id;
	if (!id) return new Response(null);

	const app = await getEntry("apps", id);
	if (!app) return new Response(null);

	const originalImage = await fetch(new URL(decodeResourceUrl(app.data.icon)), {
		method: "GET"
	});

	const processedImage = await sharp(await originalImage.arrayBuffer())
		.resize(sizes["medium"].width, sizes["medium"].height)
		.webp()
		.toBuffer();

	return new Response(processedImage, {
		headers: {
			"Content-Type": "image/webp"
		}
	});
}