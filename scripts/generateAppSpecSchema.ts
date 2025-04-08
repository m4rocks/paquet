import fs from "node:fs/promises"
import zodToJsonSchema from 'zod-to-json-schema';
import { appSpecSchema } from "../src/lib/app-schema";
import path from "node:path";

console.log("Building Schema");
const appJsonSchema = zodToJsonSchema(appSpecSchema, {
	name: "appSpec",
});

await fs.writeFile(path.join(__dirname, "..", "app-spec-schema.json"), JSON.stringify(appJsonSchema));

console.log("App Spec Schema built");