import type { CollectionEntry } from "astro:content";
import { Card, CardContent } from "./ui/card";
import { AppIcon } from "./app-icon";
import { Button } from "./ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { cn, getContrastColor } from "@/lib/utils";
import { LazyLoadImage } from "./lazy-load-image";
import { getAppResource } from "@/lib/images";

export interface AppPageCardProps {
	app: CollectionEntry<"apps">
}

export function AppPageCard({ app }: AppPageCardProps) {
	return (
		<Card className="overflow-hidden">
			{app.data.cover ?
				<LazyLoadImage
					lowResImageSrc={getAppResource(app.id, "cover", "small").src!}
					highResImageSrc={getAppResource(app.id, "cover", "large").src!}
					alt={app.data.name}
					className="-mt-6 h-32 md:h-48 object-cover"
				/>
			: null}
			<CardContent className="flex flex-col md:flex-row md:items-center gap-4">
				<div className="flex flex-row items-center gap-4">
					<AppIcon
						appId={app.id}
					/>
					<div>
						<h1 className="text-lg font-bold">
							{app.data.name}
						</h1>
						<a
							href={app.data.authorUrl}
							className={cn("text-muted-foreground text-sm", app.data.authorUrl ? "underline" : "")}
						>
							{app.data.author}
						</a>
					</div>
				</div>
				<div className="w-full md:w-auto md:ml-auto">
					<a 
						href={app.data.url}
						target="_blank"
						rel="noreferrer noopener"
					>
						<Button
							size="lg"
							className="w-full shadow-none text-shadow-lg border"
							style={{
								backgroundColor: app.data.accentColor,
								color: getContrastColor(app.data.accentColor)
							}}
						>
							<ExternalLinkIcon className="shadow-lg"/>
							Open
						</Button>
					</a>
				</div>
			</CardContent>
		</Card>
	)
}