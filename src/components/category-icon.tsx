import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

export interface CategoryIconProps {
	category: Category;
	className?: string;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
	return (
		<span
			className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-[30%] text-white shadow-sm [&_svg]:size-1/2", className)}
			style={{
				backgroundColor: category.color,
				backgroundImage: "linear-gradient(to bottom, rgb(255 255 255 / 0.25), transparent)"
			}}
		>
			<category.icon/>
		</span>
	)
}
