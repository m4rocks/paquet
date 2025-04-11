import { UAParser } from "ua-parser-js";

export const getBrowser = (userAgent?: string) => {
	const { browser, os } = UAParser(userAgent);

	return { browser, os }
}