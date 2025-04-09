import type { APIRoute, GetStaticPaths } from "astro";
import sharp from "sharp";
import { getCollection, getEntry } from "astro:content";

export const prerender = true;
const WIDTH = 128;
const HEIGHT = 128;

export const getStaticPaths: GetStaticPaths = async () => {
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

	const originalImage = await fetch(new URL(app.data.icon), {
		method: "GET"
	});

	const processedImage = await sharp(await originalImage.arrayBuffer())
		.resize(WIDTH, HEIGHT)
		.webp()
		.toBuffer();

	return new Response(processedImage, {
		headers: {
			"Content-Type": "image/webp"
		}
	});
}