import type { CollectionEntry } from "astro:content";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getImage } from "astro:assets";

export interface AppCardProps {
	app: CollectionEntry<"apps">
}

export async function AppCard({ app }: AppCardProps) {
	if (!app.data.cover) return null;
	const compiledImg = await getImage({ src: app.data.cover, width: 400 + 128, height: 200 + 128, format: "webp" });

	return (
		<Card
			className="relative overflow-hidden w-96 h-48"
		>
			<img
				src={compiledImg.src}
				alt={app.data.name}
				className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
			/>
			<CardHeader>
				<CardTitle>
					{app.data.name}
				</CardTitle>
				<CardDescription className="line-clamp-1">
					{app.data.description}
				</CardDescription>
			</CardHeader>
		</Card>
	)
}
