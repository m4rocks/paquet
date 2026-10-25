import { useEffect, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { DownloadIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getBrowser } from "@/lib/detect-browser";
import { getInstallInstructions, type InstallInstructions } from "@/lib/install-steps";
import { Button } from "../ui/button";
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
			className="w-full sm:w-auto"
		>
			<DownloadIcon/>
			Install
		</Button>
	);

	const steps = (
		<ol className="list-decimal pl-6 space-y-2">
			{instructions.steps.map((step) => (
				<li key={step}>{step}</li>
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
