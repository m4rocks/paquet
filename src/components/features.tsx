import { cn, getContrastColor } from "@/lib/utils"
import type { CollectionEntry } from "astro:content"
import { LaptopIcon, SmartphoneIcon, CloudOffIcon, LockIcon, SquareCodeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export interface FeaturesListProps {
	features: CollectionEntry<"apps">["data"]["features"],
	accentColor?: string;
}

const FEATURES = [
	{
		id: "desktop",
		name: "Desktop optimized",
		icon: LaptopIcon
	},
	{
		id: "mobile",
		name: "Mobile optimized",
		icon: SmartphoneIcon
	},
	{
		id: "offline",
		name: "Works offline",
		icon: CloudOffIcon
	},
	{
		id: "auth",
		name: "Needs authentication",
		icon: LockIcon
	},
	{
		id: "openSource",
		name: "Open source",
		icon: SquareCodeIcon
	}
] as const;

export function FeaturesList({ features, accentColor }: FeaturesListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Features
				</CardTitle>
				<CardDescription>
					Stuff that this app features.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{FEATURES.map((f) => (
						<div className="flex flex-row items-center gap-2" key={f.id}>
							<div
								className={cn(features.includes(f.id) ?  (!accentColor? "bg-primary text-primary-foreground" : "border") : "bg-muted text-muted-foreground", "p-4 rounded-full")}
								style={{
									backgroundColor: features.includes(f.id) && accentColor ? accentColor : undefined,
									color: features.includes(f.id) && accentColor ? getContrastColor(accentColor) : undefined
								}}
							>
								<f.icon/>
							</div>
							<p
								className={cn(features.includes(f.id) ? "text-foreground" : "text-muted-foreground", "text-wrap")}
							>
								{f.name}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}