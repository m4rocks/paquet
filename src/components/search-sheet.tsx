import { SearchIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useEffect, useState } from "react";
import type { PagefindClient, PagefindSearchResultData } from "@/lib/pagefind";
import { AppIcon } from "./app-icon";
import { navigate } from "astro:transitions/client";

export interface SearchSheetProps {
	buttonClassName?: string
}

export function SearchSheet({ buttonClassName }: SearchSheetProps) {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [pagefind, setPagefind] = useState<PagefindClient | null>(null);
	const [results, setResults] = useState<PagefindSearchResultData[]>([]);

	useEffect(() => {
		if (import.meta.env.DEV) return;

		(async () => {
			const pfjs = await import(window.location.origin + "/pagefind/pagefind.js");

			setPagefind(pfjs);
			pagefind?.init();
		})();
	}, [])

	useEffect(() => {
		pagefind?.search(input).then(async (res) => {
			setResults(
				await Promise.all(
					res.results.map((r) => r.data())
				)
			)
		})
	}, [input])

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}
		>
			<SheetTrigger asChild>
				<button
					className={cn(
						"bg-accent [&_svg:not([class*='text-'])]:text-muted-foreground text-muted-foreground flex flex-row items-center cursor-text",
						"gap-2 px-2 py-1.5 w-full rounded-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
						"transition-all ease-out duration-300",
						open ? "transform -translate-y-32 opacity-0" : "opacity-100",
						buttonClassName
					)}
				>
					<SearchIcon/>
					Search apps...
				</button>
			</SheetTrigger>
			<SheetContent side="top">
				<SheetHeader>
					<SheetTitle className="hidden">
						Search apps
					</SheetTitle>
				</SheetHeader>
				<div className="container">
					<Command
						className="mb-8"
						shouldFilter={false}
					>
						<CommandInput
							placeholder={import.meta.env.DEV ? "Searching is disabled in dev mode" : "Search apps..."}
							value={input}
							onValueChange={setInput}
							disabled={import.meta.env.DEV}
						/>
						<CommandList>
							<CommandEmpty>
								{input.trim().length ? "No apps found..." : "Type something to see results"}
							</CommandEmpty>
							{results.length ? results.map((app) => (
								<CommandItem
									key={app.meta.id}
									onSelect={() => navigate(app.url)}
								>
									<AppIcon
										appId={app.meta.id}
										width={32}
										height={32}
									/>
									{app.meta.title}
								</CommandItem>
							))
							:null}
						</CommandList>
					</Command>
				</div>
			</SheetContent>
		</Sheet>
	)
}
