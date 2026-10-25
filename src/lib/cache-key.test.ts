import { describe, expect, test } from "bun:test";
import { RELATED_APPS_LIMIT } from "./app-queries";
import { appPageCacheKey, dataCacheKey } from "./cache-key";

const app = (id: string, categories: string[], name = id) => ({
	id,
	data: { name, categories, features: [] as string[] }
});

describe("dataCacheKey", () => {
	test("is the same for equal data", () => {
		expect(dataCacheKey(app("a", ["games"]))).toBe(dataCacheKey(app("a", ["games"])));
	});

	test("changes when an entry's data changes", () => {
		expect(dataCacheKey(app("a", ["games"], "Old"))).not.toBe(dataCacheKey(app("a", ["games"], "New")));
	});

	test("changes when an entry is added, removed or reordered", () => {
		const a = app("a", ["games"]);
		const b = app("b", ["games"]);
		expect(dataCacheKey(a)).not.toBe(dataCacheKey(a, b));
		expect(dataCacheKey(a, b)).not.toBe(dataCacheKey(b, a));
	});
});

describe("appPageCacheKey", () => {
	const keyFor = (apps: ReturnType<typeof app>[]) => appPageCacheKey(apps[0], apps);

	test("changes when a related app changes, because the page lists it", () => {
		const before = [app("a", ["games"]), app("b", ["games"], "Old")];
		const after = [app("a", ["games"]), app("b", ["games"], "New")];
		expect(keyFor(before)).not.toBe(keyFor(after));
	});

	test("ignores an app that shares no category", () => {
		const before = [app("a", ["games"]), app("b", ["news"], "Old")];
		const after = [app("a", ["games"]), app("b", ["news"], "New")];
		expect(keyFor(before)).toBe(keyFor(after));
	});

	test("ignores an app the page does not have room to list", () => {
		const others = Array.from({ length: RELATED_APPS_LIMIT + 1 }, (_, i) => app(`b${i}`, ["games"]));
		const last = others[others.length - 1];
		const before = [app("a", ["games"]), ...others];
		const after = [app("a", ["games"]), ...others.slice(0, -1), { ...last, data: { ...last.data, name: "New" } }];
		expect(keyFor(before)).toBe(keyFor(after));
	});
});
