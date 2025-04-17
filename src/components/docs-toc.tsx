import { HomeIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

export interface DocsTocProps {
	toc: { id:string; title: string }[];
	docId: string;
}

export function DocsToc({ toc, docId }: DocsTocProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(window.matchMedia('screen and (width >= 48rem)').matches);
	}, [])

	return (
		<div className="min-w-48 border-b p-4 md:border-r md:border-b-0">
			<Accordion 
				type="single" 
				collapsible
				value={open ? "toc" : ""}
				onValueChange={(v) => setOpen(v === "toc")}
			>
				<AccordionItem value="toc" className="md:fixed">
					<AccordionTrigger>
						Table of contents
					</AccordionTrigger>
					<AccordionContent>
						<div className="flex flex-col gap-2">
							<a
								href="/home"
								className="transition-colors text-nowrap px-2.5 py-1 rounded hover:bg-accent flex flex-row items-center gap-1"
							>
								<HomeIcon className="w-4 h-4 inline"/>
								Home
							</a>
							<Separator />
							{toc.map((e) => (
								<a
									key={e.id}
									href={"/docs/" + e.id}
									className={"transition-colors text-nowrap px-2.5 py-1 rounded " + (docId === e.id ? "text-primary-foreground bg-primary" : "hover:bg-accent")}
								>
									{e.title}
								</a>
							))}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}