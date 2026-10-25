import type { JSX } from "react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";

export interface ListItemProps {
	left?: React.ReactNode;
	right?: React.ReactNode;
	title: string;
	subtitle?: string;
	href?: string;
	external?: boolean;
	separator?: boolean;
	onClick?: () => void;
}


export function ListItem({ left: LeftComponent, right: RightComponent, title, subtitle, href, external, onClick, separator }: ListItemProps) {
	let RootElement: keyof JSX.IntrinsicElements = "div";
	if (href) RootElement = "a";
	if (onClick) RootElement = "button";


	return (
		<>
			<RootElement
				className={cn(
					"group/list-item flex flex-row gap-4 p-2 rounded-xl items-center text-left transition-[background-color,scale] duration-200 ease-out",
					href || onClick ? "hover:bg-accent focus-visible:bg-accent dark:hover:bg-accent/50 active:scale-[0.98] text-accent-foreground" : ""
				)}
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer noopener" : undefined}
				onClick={onClick}
			>
				{LeftComponent ?
					LeftComponent
				: null}
				<div className="min-w-0 flex-1">
					<p className="font-semibold truncate">{title}</p>
					<p className="text-muted-foreground text-sm truncate">{subtitle}</p>
				</div>
				{RightComponent ?
					RightComponent
				: null}
			</RootElement>
			{separator ? <Separator/> : null}
		</>
	)
}
