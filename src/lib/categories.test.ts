import { describe, expect, test } from "bun:test";
import { getCategory } from "./categories";

describe("getCategory", () => {
	test("finds a category by its id", () => {
		expect(getCategory("games")?.name).toBe("Games");
	});

	test("returns nothing for aliases and unknown ids", () => {
		expect(getCategory("game")).toBeUndefined();
		expect(getCategory("not-a-category")).toBeUndefined();
	});
});
