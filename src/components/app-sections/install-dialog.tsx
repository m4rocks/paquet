import { useEffect, useState } from "react";
import type { CollectionEntry } from "astro:content";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { getBrowser } from "@/lib/detect-browser";
import { getInstallInstructions, type InstallInstructions } from "@/lib/install-steps";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export interface InstallDialogProps {
	app: CollectionEntry<"apps">
}

export function InstallDialog({ app }: InstallDialogProps) {
	// Starts generic so the server render and the first client render match.
	const [instructions, setInstructions] = useState<InstallInstructions>(getInstallInstructions({}));

	useEffect(() => {
		const { browser, os } = getBrowser(navigator.userAgent);
		setInstructions(getInstallInstructions({ browser: browser.name, os: os.name }));
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="lg"
					variant="outline"
					className="w-full sm:w-auto"
				>
					<DownloadIcon/>
					Install
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Install {app.data.name}</DialogTitle>
					<DialogDescription>
						{app.data.name} is installed from its own website. Open it, then follow these steps.
					</DialogDescription>
				</DialogHeader>
				<ol className="list-decimal pl-6 space-y-2">
					{instructions.steps.map((step) => (
						<li key={step}>{step}</li>
					))}
				</ol>
				{instructions.supported ?
					<Button asChild>
						<a
							href={app.data.url}
							target="_blank"
							rel="noreferrer noopener"
						>
							<ExternalLinkIcon/>
							Open {app.data.name}
						</a>
					</Button>
				: null}
			</DialogContent>
		</Dialog>
	)
}
