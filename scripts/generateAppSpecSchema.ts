import fs from "node:fs/promises"
import { z } from "astro/zod";
import { appSpecSchema } from "../src/lib/app-schema";
import path from "node:path";

console.log("Building Schema");
const appJsonSchema = z.toJSONSchema(appSpecSchema);

await fs.writeFile(path.join(__dirname, "..", "app-spec-schema.json"), JSON.stringify(appJsonSchema));

console.log("App Spec Schema built");
