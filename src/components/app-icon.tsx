import { getAppResource } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface AppIconProps {
	appId: string;
	className?: string;
	width?: number;
	height?: number;
}

export async function AppIcon({ appId, className, width = 48, height = 48 }: AppIconProps) {
	const { src } = getAppResource(appId, "icon");

	return (
		<div
			className={cn("rounded-lg bg-white overflow-hidden", className)}
			style={{ width, height }}
		>
			<img
				src={src || ""}
				alt=""
				width={width}
				height={height}
				className="w-full h-full"
			/>
		</div>
	)
}
