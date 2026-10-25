import type { CollectionEntry } from "astro:content";
import { Card } from "./ui/card";
import { LazyLoadImage } from "./lazy-load-image";
import { getAppResource } from "@/lib/images";
import { AppIcon } from "./app-icon";

export interface AppCardProps {
	app: CollectionEntry<"apps">
}

export function AppCard({ app }: AppCardProps) {
	const { src: lowResImage } = getAppResource(app.id, "cover", "small");
	const { src: highResImage } = getAppResource(app.id, "cover", "medium");

	return (
		<Card
			className="group/app-card relative overflow-hidden h-full p-0 gap-0 border-0 shadow-md transition-shadow duration-300 hover:shadow-lg"
			style={{ backgroundColor: app.data.accentColor }}
		>
			<LazyLoadImage
				highResImageSrc={highResImage || ""}
				lowResImageSrc={lowResImage || ""}
				className="w-full h-full object-cover pointer-events-none transition-transform duration-500 ease-out group-hover/app-card:scale-105"
				loading="lazy"
				alt=""
			/>

			{/* Scrim so the white label stays readable on any cover. */}
			<div className="absolute inset-x-0 bottom-0 flex flex-row items-center gap-3 bg-linear-to-t from-black/80 via-black/50 to-transparent p-3 pt-10 text-white">
				<AppIcon
					appId={app.id}
					width={44}
					height={44}
					className="outline-white/20"
				/>
				<div className="min-w-0">
					<p className="text-lg font-bold leading-tight truncate">
						{app.data.name}
					</p>
					<p className="text-sm text-white/75 truncate">
						{app.data.author}
					</p>
				</div>
			</div>
		</Card>
	)
}
