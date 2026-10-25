import { useEffect, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { DownloadIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getBrowser } from "@/lib/detect-browser";
import { getInstallInstructions, type InstallInstructions } from "@/lib/install-steps";
import { Button } from "../ui/button";
import { getContrastColor } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export interface InstallDialogProps {
	app: CollectionEntry<"apps">
}

export function InstallDialog({ app }: InstallDialogProps) {
	// Starts generic so the server render and the first client render match.
	const [instructions, setInstructions] = useState<InstallInstructions>(getInstallInstructions({}));
	const isDesktop = useMediaQuery("(min-width: 640px)");

	useEffect(() => {
		const { browser, os } = getBrowser(navigator.userAgent);
		setInstructions(getInstallInstructions({ browser: browser.name, os: os.name }));
	}, []);

	const title = `Install ${app.data.name}`;
	const description = `${app.data.name} is installed from its own website. Open it, then follow these steps.`;

	const trigger = (
		<Button
			size="lg"
			variant="outline"
			className="w-full md:w-auto md:px-8 rounded-full font-semibold transition-[background-color,scale] active:scale-95"
		>
			<DownloadIcon/>
			Install
		</Button>
	);

	const steps = (
		<ol className="space-y-3">
			{instructions.steps.map((step, idx) => (
				<li key={step} className="flex flex-row items-start gap-3">
					<span
						className="flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
						style={{
							backgroundColor: app.data.accentColor,
							color: getContrastColor(app.data.accentColor)
						}}
					>
						{idx + 1}
					</span>
					<span className="pt-0.5">{step}</span>
				</li>
			))}
		</ol>
	);

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{steps}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col gap-4 p-4 pb-[calc(1rem_+_env(safe-area-inset-bottom))]">
					{steps}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
