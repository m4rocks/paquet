import { cn } from "@/lib/utils";
import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";

export interface AppIconProps {
	app: CollectionEntry<"apps">;
	width: number;
	height: number;
	className?: string;
}

export async function AppIcon({ app, width, height, className }: AppIconProps) {
	const compiledImg = await getImage({ src: app.data.icon, width: width + 32, height: height + 32, format: "webp" });

	return (
		<div
			className={cn("rounded-full bg-white overflow-hidden", className)}
			style={{ width, height }}
		>
			<img
				src={compiledImg.src}
				alt={app.data.name}
				width={width}
				height={height}
				className="w-full h-full"
			/>
		</div>
	)
}
