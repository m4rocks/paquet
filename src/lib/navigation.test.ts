import { describe, expect, test } from "bun:test";
import { activeTab } from "./navigation";

describe("activeTab", () => {
	test("marks Home on the home page", () => {
		expect(activeTab("/home")).toBe("home");
	});

	test("marks Categories on the index and on a single category", () => {
		expect(activeTab("/categories")).toBe("categories");
		expect(activeTab("/category/games")).toBe("categories");
	});

	test("marks nothing on pages outside the tabs", () => {
		expect(activeTab("/")).toBeNull();
		expect(activeTab("/app/com.monkeytype")).toBeNull();
		expect(activeTab("/docs/getting-started")).toBeNull();
	});
});
