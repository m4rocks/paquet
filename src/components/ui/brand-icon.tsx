import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BrandIconProps extends HTMLAttributes<HTMLDivElement> {
	icon: string;
	width?: number | `${number}`;
	height?: number | `${number}`;
	imgClassName?: string;
}

export default function BrandIcon(props: BrandIconProps) {
	const { icon, width, height, imgClassName, ...otherProps } = props;
	return (
		<div
			{...otherProps}
		>
			<img
				src={`https://cdn.simpleicons.org/${icon}/000000`}
				className={cn("block dark:hidden", imgClassName)}
				alt=""
				width={width}
				height={height}
			/>
			<img
				src={`https://cdn.simpleicons.org/${icon}/ffffff`}
				className={cn("hidden dark:block", imgClassName)}
				alt=""
				width={width}
				height={height}
			/>
		</div>
	)
}