import { getAppResource } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

export interface AppIconProps {
	app: CollectionEntry<"apps">;
	className?: string;
	width?: number;
	height?: number;
}

export async function AppIcon({ app, className, width = 48, height = 48 }: AppIconProps) {
	const { src } = getAppResource(app.id, "icon");

	return (
		<div
			className={cn("rounded-lg bg-white overflow-hidden", className)}
			style={{ width, height }}
		>
			<img
				src={src || ""}
				alt={app.data.name}
				width={width}
				height={height}
				className="w-full h-full"
			/>
		</div>
	)
}
