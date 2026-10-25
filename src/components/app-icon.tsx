import { getAppResource } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface AppIconProps {
	appId: string;
	className?: string;
	width?: number;
	height?: number;
}

export function AppIcon({ appId, className, width = 48, height = 48 }: AppIconProps) {
	const { src } = getAppResource(appId, "icon");

	return (
		<div
			// The inset outline paints over the image, so white icons keep an edge on light backgrounds.
			className={cn("rounded-[23%] overflow-hidden bg-card shadow-sm outline-solid outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10", className)}
			style={{
				width,
				height,
				minWidth: width,
				minHeight: height
			}}
		>
			<img
				src={src || ""}
				alt=""
				width={width}
				height={height}
				loading="lazy"
				className="w-full h-full"
			/>
		</div>
	)
}
