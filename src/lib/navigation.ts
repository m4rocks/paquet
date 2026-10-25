export type TabId = "home" | "categories";

// "/categor" covers both the index (/categories) and a single category (/category/games).
export const activeTab = (pathname: string): TabId | null => {
	if (pathname.startsWith("/home")) return "home";
	if (pathname.startsWith("/categor")) return "categories";
	return null;
}
