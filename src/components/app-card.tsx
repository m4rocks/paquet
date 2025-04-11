import type { CollectionEntry } from "astro:content";
import { Card } from "./ui/card";
import { LazyLoadImage } from "./lazy-load-image";
import { getAppResource } from "@/lib/images";

export interface AppCardProps {
	app: CollectionEntry<"apps">
}

export function AppCard({ app }: AppCardProps) {
	const { src: lowResImage } = getAppResource(app.id, "cover", "small");
	const { src: highResImage } = getAppResource(app.id, "cover", "medium");

	return (
		<Card
			className="relative overflow-hidden h-full p-0 bg-neutral-800"
		>
			<LazyLoadImage
				highResImageSrc={highResImage || ""}
				lowResImageSrc={lowResImage || ""}
				className="w-full h-full object-cover pointer-events-none mask-b-from-10%"
				loading="lazy"
				alt={app.data.name}
			/>

			<p className="absolute left-2 bottom-2 text-xl text-white font-bold text-shadow-lg line-clamp-1">
				{app.data.name}
			</p>
		</Card>
	)
}
