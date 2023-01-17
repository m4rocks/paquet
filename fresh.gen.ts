// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/app/[id].tsx";
import * as $3 from "./routes/app/error.tsx";
import * as $4 from "./routes/auth/callback.ts";
import * as $5 from "./routes/auth/login.ts";
import * as $6 from "./routes/auth/logout.ts";
import * as $7 from "./routes/category/[id].tsx";
import * as $8 from "./routes/category/index.tsx";
import * as $9 from "./routes/docs/[doc].tsx";
import * as $10 from "./routes/docs/index.tsx";
import * as $11 from "./routes/gfm.css.ts";
import * as $12 from "./routes/index.tsx";
import * as $13 from "./routes/library.tsx";
import * as $14 from "./routes/login.tsx";
import * as $15 from "./routes/search.tsx";
import * as $16 from "./routes/settings.tsx";
import * as $17 from "./routes/sitemap.xml.ts";
import * as $$0 from "./islands/AddToLibrary.tsx";
import * as $$1 from "./islands/Dialog.tsx";
import * as $$2 from "./islands/InstallBanner.tsx";
import * as $$3 from "./islands/LibraryApps.tsx";
import * as $$4 from "./islands/LogoutButton.tsx";
import * as $$5 from "./islands/Navbar.tsx";

const manifest = {
	routes: {
		"./routes/_app.tsx": $0,
		"./routes/_middleware.ts": $1,
		"./routes/app/[id].tsx": $2,
		"./routes/app/error.tsx": $3,
		"./routes/auth/callback.ts": $4,
		"./routes/auth/login.ts": $5,
		"./routes/auth/logout.ts": $6,
		"./routes/category/[id].tsx": $7,
		"./routes/category/index.tsx": $8,
		"./routes/docs/[doc].tsx": $9,
		"./routes/docs/index.tsx": $10,
		"./routes/gfm.css.ts": $11,
		"./routes/index.tsx": $12,
		"./routes/library.tsx": $13,
		"./routes/login.tsx": $14,
		"./routes/search.tsx": $15,
		"./routes/settings.tsx": $16,
		"./routes/sitemap.xml.ts": $17,
	},
	islands: {
		"./islands/AddToLibrary.tsx": $$0,
		"./islands/Dialog.tsx": $$1,
		"./islands/InstallBanner.tsx": $$2,
		"./islands/LibraryApps.tsx": $$3,
		"./islands/LogoutButton.tsx": $$4,
		"./islands/Navbar.tsx": $$5,
	},
	baseUrl: import.meta.url,
	config,
};

export default manifest;
