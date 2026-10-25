import type { Category } from "@/lib/categories";
import { CategoryIcon } from "./category-icon";
import { SectionHeading } from "./section-heading";

export interface CategoryHeadingProps {
	category: Category;
}

export function CategoryHeading({ category }: CategoryHeadingProps) {
	return (
		<SectionHeading href={`/category/${category.id}`}>
			<span className="flex flex-row items-center gap-3">
				<CategoryIcon category={category} className="size-8"/>
				{category.name}
			</span>
		</SectionHeading>
	)
}
