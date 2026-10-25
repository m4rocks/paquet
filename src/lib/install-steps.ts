export interface InstallTarget {
	browser?: string;
	os?: string;
}

export interface InstallInstructions {
	supported: boolean;
	steps: string[];
}

const mobileMenuSteps = [
	"Open the browser menu.",
	"Choose Install app or Add to Home screen."
];

export const getInstallInstructions = ({ browser = "", os = "" }: InstallTarget): InstallInstructions => {
	if (os === "iOS") {
		return {
			supported: true,
			steps: [
				"Tap the Share button.",
				"Choose Add to Home Screen."
			]
		};
	}

	if (os === "Android") {
		return { supported: true, steps: mobileMenuSteps };
	}

	if (browser === "Firefox") {
		return {
			supported: false,
			steps: ["Firefox on desktop cannot install web apps. Open this app in Chrome or Edge to install it."]
		};
	}

	if (browser === "Edge") {
		return {
			supported: true,
			steps: [
				"Open the browser menu.",
				"Choose Apps, then Install this site as an app."
			]
		};
	}

	if (browser === "Safari" && os === "macOS") {
		return {
			supported: true,
			steps: [
				"Open the File menu.",
				"Choose Add to Dock."
			]
		};
	}

	if (browser === "Chrome") {
		return {
			supported: true,
			steps: [
				"Look for the install icon on the right side of the address bar and click it.",
				"If there is no icon, open the browser menu and choose Cast, save and share, then Install page as app."
			]
		};
	}

	return {
		supported: true,
		steps: [
			"Open the browser menu.",
			"Look for an Install or Add to Home screen option."
		]
	};
}
