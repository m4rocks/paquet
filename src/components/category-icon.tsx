import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

export interface CategoryIconProps {
	category: Category;
	className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
	return (
		<span
			className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-link dark:bg-primary/25 [&_svg]:size-1/2", className)}
		>
			<category.icon/>
		</span>
	)
}
