import type { CollectionEntry } from "astro:content";
import { Card } from "../ui/card";
import { AppIcon } from "../app-icon";
import { Button } from "../ui/button";
import { CloudOffIcon, ExternalLinkIcon, LaptopIcon, SmartphoneIcon, SquareCodeIcon } from "lucide-react";
import { cn, getContrastColor } from "@/lib/utils";
import { LazyLoadImage } from "../lazy-load-image";
import { getAppResource } from "@/lib/images";
import { getCategory } from "@/lib/categories";
import { platformLabel } from "@/lib/app-platforms";
import { CategoryIcon } from "../category-icon";
import { InstallDialog } from "./install-dialog";

export interface AppPageCardProps {
	app: CollectionEntry<"apps">
}

export function AppPageCard({ app }: AppPageCardProps) {
	const appCategories = app.data.categories.map(getCategory).filter((c) => !!c);
	const platforms = platformLabel(app.data.features);

	return (
		<Card className="overflow-hidden gap-0 py-0 shadow-lg">
			{app.data.cover ?
				<LazyLoadImage
					lowResImageSrc={getAppResource(app.id, "cover", "small").src!}
					highResImageSrc={getAppResource(app.id, "cover", "large").src!}
					alt=""
					className="w-full h-36 md:h-56 object-cover"
				/>
			: null}
			<div className="flex flex-col md:flex-row md:items-end gap-4 p-5 md:p-6">
				<div className="flex flex-row items-end gap-4 min-w-0">
					<AppIcon
						appId={app.id}
						width={96}
						height={96}
						className={cn("ring-4 ring-card shadow-lg", app.data.cover ? "-mt-14 md:-mt-16" : "")}
					/>
					<div className="min-w-0 pb-1">
						<h1 className="text-2xl md:text-3xl font-bold leading-tight text-balance">
							{app.data.name}
						</h1>
						{app.data.authorUrl ?
							<a
								href={app.data.authorUrl}
								target="_blank"
								rel="noreferrer noopener"
								className="text-link font-semibold text-sm hover:underline"
							>
								{app.data.author}
							</a>
						:
							<p className="text-muted-foreground text-sm">{app.data.author}</p>
						}
					</div>
				</div>
				<div className="w-full md:w-auto md:ml-auto grid grid-cols-2 md:flex md:flex-row gap-2">
					<Button
						asChild
						size="lg"
						className="w-full md:w-auto md:px-8 rounded-full font-semibold shadow-md transition-[filter,scale] hover:brightness-110 active:scale-95"
						style={{
							backgroundColor: app.data.accentColor,
							color: getContrastColor(app.data.accentColor)
						}}
					>
						<a
							href={app.data.url}
							target="_blank"
							rel="noreferrer noopener"
						>
							<ExternalLinkIcon/>
							Open
						</a>
					</Button>
					<InstallDialog app={app}/>
				</div>
			</div>

			{/* Two columns on phones (a lone last cell spans both), one row with dividers from md up. */}
			<dl className="grid grid-cols-2 gap-y-4 border-t px-1 py-4 md:flex md:flex-row md:py-3 [&>div:last-child:nth-child(odd)]:col-span-2 max-md:[&>div:nth-child(even)]:border-l md:[&>div:not(:first-child)]:border-l">
				{appCategories.length ?
					<InfoCell label={appCategories.length > 1 ? "Categories" : "Category"}>
						<span className="flex flex-row items-center justify-center gap-2">
							<CategoryIcon category={appCategories[0]} className="size-6"/>
							<a href={`/category/${appCategories[0].id}`} className="hover:underline">
								{appCategories[0].name}
							</a>
							{appCategories.length > 1 ?
								<span className="text-muted-foreground font-normal">+{appCategories.length - 1}</span>
							: null}
						</span>
					</InfoCell>
				: null}
				{platforms ?
					<InfoCell label="Made for">
						<span className="flex flex-row items-center justify-center gap-2">
							{app.data.features.includes("desktop") ? <LaptopIcon className="size-5" aria-hidden/> : null}
							{app.data.features.includes("mobile") ? <SmartphoneIcon className="size-5" aria-hidden/> : null}
							{platforms}
						</span>
					</InfoCell>
				: null}
				{app.data.features.includes("offline") ?
					<InfoCell label="Offline">
						<span className="flex flex-row items-center justify-center gap-2">
							<CloudOffIcon className="size-5" aria-hidden/>
							Works offline
						</span>
					</InfoCell>
				: null}
				{app.data.features.includes("open-source") ?
					<InfoCell label="Source">
						<span className="flex flex-row items-center justify-center gap-2">
							<SquareCodeIcon className="size-5" aria-hidden/>
							Open source
						</span>
					</InfoCell>
				: null}
			</dl>
		</Card>
	)
}

interface InfoCellProps {
	label: string;
	children: React.ReactNode;
}

function InfoCell({ label, children }: InfoCellProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-1 px-3 md:px-5 md:flex-auto">
			<dt className="text-xs text-muted-foreground uppercase tracking-wide">{label}</dt>
			<dd className="font-semibold text-sm text-center">{children}</dd>
		</div>
	)
}
