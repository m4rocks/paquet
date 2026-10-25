import { describe, expect, test } from "bun:test";
import { appSpecSchema } from "./app-schema";

const validSpec = {
	$schema: "../app-spec-schema.json",
	id: "rocks.m4.paquet",
	url: "https://paquet.m4.rocks",
	features: ["mobile"],
	author: "m4rocks",
	updatedDate: "2025-01-01"
};

describe("appSpecSchema store links", () => {
	test("accepts a Google Play and an App Store link", () => {
		const result = appSpecSchema.safeParse({
			...validSpec,
			playStoreUrl: "https://play.google.com/store/apps/details?id=rocks.m4.paquet",
			appStoreUrl: "https://apps.apple.com/app/paquet/id123456789"
		});
		expect(result.success).toBe(true);
	});

	test("store links are optional", () => {
		expect(appSpecSchema.safeParse(validSpec).success).toBe(true);
	});

	test("rejects a Google Play link that points somewhere else", () => {
		const result = appSpecSchema.safeParse({ ...validSpec, playStoreUrl: "https://example.com/store/apps/details?id=x" });
		expect(result.success).toBe(false);
	});

	test("rejects an App Store link that points somewhere else", () => {
		const result = appSpecSchema.safeParse({ ...validSpec, appStoreUrl: "https://example.com/app/id1" });
		expect(result.success).toBe(false);
	});
});
