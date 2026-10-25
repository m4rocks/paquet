import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
	children: React.ReactNode;
	href?: string;
	linkLabel?: string;
	className?: string;
}

export function SectionHeading({ children, href, linkLabel = "See all", className }: SectionHeadingProps) {
	return (
		<div className={cn("flex flex-row items-end justify-between gap-4", className)}>
			<h2 className="text-2xl font-bold text-balance">{children}</h2>
			{href ?
				<a
					href={href}
					className="flex shrink-0 flex-row items-center gap-0.5 rounded-full px-2 py-1 text-sm font-semibold text-link transition-colors hover:bg-primary/10"
				>
					{linkLabel}
					<ChevronRightIcon className="size-4"/>
				</a>
			: null}
		</div>
	)
}
