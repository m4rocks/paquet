import type { CollectionEntry } from "astro:content";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getImage } from "astro:assets";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "./lazy-load-image";

export interface AppCardProps {
	app: CollectionEntry<"apps">
	lowResImage: string;
	highResImage: string;
}

export function AppCardClient({ app, lowResImage, highResImage }: AppCardProps) {
	return (
		<Card
			className="relative overflow-hidden h-full"
		>
			<LazyLoadImage
				highResImageSrc={highResImage}
				lowResImageSrc={lowResImage}
				className="absolute inset-0 w-full h-full object-cover pointer-events-none"
				loading="lazy"
				alt={app.data.name}
			/>
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
