import type { CollectionEntry } from "astro:content";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getImage } from "astro:assets";
import { LazyLoadImage } from "./lazy-load-image";

export interface AppCardProps {
	app: CollectionEntry<"apps">
	lowResImage: string;
	highResImage: string;
}

export function AppCardClient({ app, lowResImage, highResImage }: AppCardProps) {
	return (
		<Card
			className="relative overflow-hidden h-full p-0"
		>
			<LazyLoadImage
				highResImageSrc={highResImage}
				lowResImageSrc={lowResImage}
				className="w-full h-full object-cover pointer-events-none mask-b-from-10%"
				loading="lazy"
				alt={app.data.name}
			/>

			<p className="absolute left-2 bottom-2 text-xl font-bold text-shadow-lg line-clamp-1">
				{app.data.name}
			</p>
		</Card>
	)
}

export async function AppCardServer({ app, lowResImage, highResImage }: AppCardProps) {
	if (!import.meta.env.SSR) {
		console.error("AppCardServer is meant to be ran only on the server");
		return null;
	}
	if (!app.data.cover) return;
	const image = await getImage({ src: app.data.cover, width: 400 + 128, height: 200 + 128, format: "webp" }).then((s) => s.src);

	return (
		<Card
			className="relative overflow-hidden h-full"
		>
			{image ? 
				<LazyLoadImage
					highResImageSrc={highResImage}
					lowResImageSrc={lowResImage}
					className="absolute inset-0 w-full h-full object-cover pointer-events-none"
					alt={app.data.name}
				/>
			: null}
		</Card>
	)
}
