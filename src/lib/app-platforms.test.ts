import { describe, expect, test } from "bun:test";
import { platformLabel } from "./app-platforms";

describe("platformLabel", () => {
	test("names both platforms when both are flagged", () => {
		expect(platformLabel(["mobile", "open-source", "desktop"])).toBe("Desktop & mobile");
	});

	test("names the single flagged platform", () => {
		expect(platformLabel(["desktop"])).toBe("Desktop");
		expect(platformLabel(["mobile", "offline"])).toBe("Mobile");
	});

	test("gives no label when no platform is flagged", () => {
		expect(platformLabel(["offline", "auth"])).toBeNull();
		expect(platformLabel([])).toBeNull();
	});
});
