import type { JSX } from "react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export interface ListItemProps {
	left?: React.ReactNode;
	title: string;
	subtitle?: string;
	href?: string;
	external?: boolean;
	separator?: boolean;
	onClick?: () => void;
}


export function ListItem({ left: LeftComponent, title, subtitle, href, external, onClick, separator }: ListItemProps) {
	let RootElement: keyof JSX.IntrinsicElements = "div";
	if (href) RootElement = "a";
	if (onClick) RootElement = "button";


	return (
		<>
			<RootElement
				className={cn(
					"flex flex-row gap-4 p-2 rounded-lg items-center transition-colors",
					href || onClick ? "hover:bg-accent focus:bg-accent dark:hover:bg-accent/50 text-accent-foreground" : ""
				)}
				href={href}
				target={external ? "_blank" : undefined}
				onClick={onClick}
			>
				{LeftComponent ?
					LeftComponent
				: null}
				<div>
					<p>{title}</p>
					<p className="text-muted-foreground text-sm">{subtitle}</p>
				</div>
			</RootElement>
			{separator ? <Separator/> : null}
		</>
	)
}
