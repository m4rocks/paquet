import { createHash } from "node:crypto";
import { RELATED_APPS_LIMIT, relatedApps } from "./app-queries";

// Astro skips a static page when its cache key is unchanged, so the key must change whenever any
// entry the page renders from changes. Hashing the entries' data guarantees that.
export const dataCacheKey = (...entries: { data: unknown }[]): string =>
	createHash("sha256").update(JSON.stringify(entries.map((entry) => entry.data))).digest("hex");

type AppEntry = Parameters<typeof relatedApps>[0] & { data: unknown };

// An app page also lists its related apps, so their data is part of what the page renders from.
export const appPageCacheKey = (app: AppEntry, apps: AppEntry[]): string =>
	dataCacheKey(app, ...relatedApps(app, apps, RELATED_APPS_LIMIT));
