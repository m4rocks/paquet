import { cn, getContrastColor } from "@/lib/utils"
import type { CollectionEntry } from "astro:content"
import { LaptopIcon, SmartphoneIcon, CloudOffIcon, LockIcon, SquareCodeIcon, CookieIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

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
		id: "open-source",
		name: "Open source",
		icon: SquareCodeIcon
	},
	{
		id: "data-collection",
		name: "Collects data",
		icon: CookieIcon
	}
] as const;

export function FeaturesList({ features, accentColor }: FeaturesListProps) {
	const sortedFeatures = FEATURES.slice().sort((a, b) => {
		const aIncluded = features.includes(a.id)
		const bIncluded = features.includes(b.id)
		return aIncluded === bIncluded ? 0 : aIncluded ? -1 : 1
	})
	
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
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
					{sortedFeatures.map((f) => {
						const included = features.includes(f.id);

						return (
							<div
								key={f.id}
								className={cn("flex flex-row items-center gap-3 rounded-2xl p-2 pr-4", included ? "bg-accent/60" : "")}
							>
								<div
									className={cn(
										"flex size-10 shrink-0 items-center justify-center rounded-full [&_svg]:size-5",
										included ? (!accentColor ? "bg-primary text-primary-foreground" : "") : "bg-muted text-muted-foreground"
									)}
									style={{
										backgroundColor: included && accentColor ? accentColor : undefined,
										color: included && accentColor ? getContrastColor(accentColor) : undefined
									}}
								>
									<f.icon aria-hidden/>
								</div>
								<p
									className={cn(included ? "text-foreground font-semibold" : "text-muted-foreground", "text-wrap")}
								>
									{f.name}
								</p>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}