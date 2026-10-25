import { describe, expect, test } from "bun:test";
import { appsInCategory, categoryCounts, relatedApps } from "./app-queries";

const app = (id: string, categories: string[], features: string[] = []) => ({
	id,
	data: { categories, features }
});

describe("appsInCategory", () => {
	const apps = [
		app("a", ["games"]),
		app("b", ["games", "social"]),
		app("c", ["news"])
	];

	test("returns every app that lists the category", () => {
		expect(appsInCategory(apps, "games").map((a) => a.id)).toEqual(["a", "b"]);
	});

	test("returns nothing for a category no app uses", () => {
		expect(appsInCategory(apps, "music")).toEqual([]);
	});
});

describe("categoryCounts", () => {
	test("counts an app once in each of its categories", () => {
		const counts = categoryCounts([
			app("a", ["games"]),
			app("b", ["games", "social"])
		]);
		expect(counts.get("games")).toBe(2);
		expect(counts.get("social")).toBe(1);
		expect(counts.get("news")).toBeUndefined();
	});
});

describe("relatedApps", () => {
	test("never includes the app itself", () => {
		const self = app("a", ["games"]);
		expect(relatedApps(self, [self, app("b", ["games"])], 5).map((a) => a.id)).toEqual(["b"]);
	});

	test("ranks more shared categories above fewer, then shared features", () => {
		const self = app("self", ["games", "social"], ["mobile"]);
		const related = relatedApps(self, [
			app("one-category", ["games"], ["mobile"]),
			app("two-categories", ["games", "social"]),
			app("one-category-no-feature", ["social"])
		], 5);
		expect(related.map((a) => a.id)).toEqual(["two-categories", "one-category", "one-category-no-feature"]);
	});

	test("leaves out apps that share no category, even if features match", () => {
		const self = app("self", ["games"], ["mobile"]);
		expect(relatedApps(self, [app("x", ["news"], ["mobile"])], 5)).toEqual([]);
	});

	test("returns at most the limit", () => {
		const self = app("self", ["games"]);
		const others = ["a", "b", "c", "d"].map((id) => app(id, ["games"]));
		expect(relatedApps(self, others, 3)).toHaveLength(3);
	});

	test("breaks ties by id so the order is stable", () => {
		const self = app("self", ["games"]);
		const related = relatedApps(self, [app("b", ["games"]), app("a", ["games"])], 5);
		expect(related.map((a) => a.id)).toEqual(["a", "b"]);
	});
});
