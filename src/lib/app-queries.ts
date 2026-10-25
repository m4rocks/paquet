interface AppLike {
	id: string;
	data: {
		categories: string[];
		features: string[];
	};
}

export const appsInCategory = <T extends AppLike>(apps: T[], categoryId: string): T[] =>
	apps.filter((app) => app.data.categories.includes(categoryId));

export const categoryCounts = (apps: AppLike[]): Map<string, number> => {
	const counts = new Map<string, number>();
	for (const app of apps) {
		for (const category of new Set(app.data.categories)) {
			counts.set(category, (counts.get(category) ?? 0) + 1);
		}
	}
	return counts;
};

const sharedCount = (a: string[], b: string[]) => a.filter((item) => b.includes(item)).length;

export const RELATED_APPS_LIMIT = 5;

export const relatedApps = <T extends AppLike>(app: AppLike, apps: T[], limit: number): T[] =>
	apps
		.filter((other) => other.id !== app.id)
		.map((other) => ({
			other,
			sharedCategories: sharedCount(app.data.categories, other.data.categories),
			sharedFeatures: sharedCount(app.data.features, other.data.features)
		}))
		.filter(({ sharedCategories }) => sharedCategories > 0)
		.sort((a, b) =>
			b.sharedCategories - a.sharedCategories ||
			b.sharedFeatures - a.sharedFeatures ||
			a.other.id.localeCompare(b.other.id)
		)
		.slice(0, limit)
		.map(({ other }) => other);
