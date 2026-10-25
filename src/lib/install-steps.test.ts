import { describe, expect, test } from "bun:test";
import { getInstallInstructions } from "./install-steps";

describe("getInstallInstructions", () => {
	test("iOS uses the Share sheet, whatever the browser", () => {
		for (const browser of ["Safari", "Mobile Safari", "Chrome"]) {
			const { steps } = getInstallInstructions({ browser, os: "iOS" });
			expect(steps.join(" ")).toContain("Share");
			expect(steps.join(" ")).toContain("Add to Home Screen");
		}
	});

	test("Android points at the browser menu", () => {
		const { steps } = getInstallInstructions({ browser: "Chrome", os: "Android" });
		expect(steps.join(" ")).toMatch(/Install app|Add to Home screen/);
	});

	test("desktop Chrome installs from the address bar", () => {
		const { steps } = getInstallInstructions({ browser: "Chrome", os: "Windows" });
		expect(steps.join(" ")).toContain("address bar");
	});

	test("desktop Edge uses the Apps menu", () => {
		const { steps } = getInstallInstructions({ browser: "Edge", os: "Windows" });
		expect(steps.join(" ")).toContain("Apps");
	});

	test("Safari on Mac adds to the Dock", () => {
		const { steps } = getInstallInstructions({ browser: "Safari", os: "macOS" });
		expect(steps.join(" ")).toContain("Add to Dock");
	});

	test("desktop Firefox cannot install web apps and says so", () => {
		const { steps, supported } = getInstallInstructions({ browser: "Firefox", os: "Windows" });
		expect(supported).toBe(false);
		expect(steps.join(" ")).toContain("Chrome");
	});

	test("an unknown browser gets generic steps rather than nothing", () => {
		const { steps, supported } = getInstallInstructions({});
		expect(supported).toBe(true);
		expect(steps.length).toBeGreaterThan(0);
	});
});
