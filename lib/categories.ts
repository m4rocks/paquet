import type { Category } from "@/types/App.ts";

export const CATEGORIES: Category[] = [
	{
		id: "utilities",
		icon: "build",
		name: "Utilities",
	},
	{
		id: "games",
		icon: "videogame_asset",
		name: "Games",
	},
	{
		id: "music",
		icon: "music_note",
		name: "Music",
	},
	{
		id: "social",
		icon: "group",
		name: "Social",
	},
	{
		id: "development",
		icon: "code",
		name: "Development",
	},
	{
		id: "lifestyle",
		icon: "heart",
		name: "Lifestyle",
	},
];

export const getCategory = (
	categoryId: Category["id"],
): Category | undefined => {
	const foundCategory = CATEGORIES.find((category) => category.id === categoryId);
	
	if (foundCategory) return foundCategory;

	let customCategory = categoryId[0].toUpperCase() + categoryId.slice(1);
	customCategory = customCategory.replace("_", " ");
	customCategory = customCategory.replace("-", " ");

	return {
		icon: "",
		id: categoryId,
		name: customCategory
	};
};
