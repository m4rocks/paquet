import { SearchIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useEffect, useState } from "react";
import type { PagefindClient, PagefindSearchResultData } from "@/lib/pagefind";
import { AppIcon } from "./app-icon";
import { navigate } from "astro:transitions/client";

// The sheet lives once in the navbar; triggers in other islands reach it through this event.
const OPEN_SEARCH_EVENT = "paquet:open-search";

export const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

export const onOpenSearch = (callback: () => void) => {
	window.addEventListener(OPEN_SEARCH_EVENT, callback);
	return () => window.removeEventListener(OPEN_SEARCH_EVENT, callback);
}

export interface SearchButtonProps {
	className?: string
}

export function SearchButton({ className }: SearchButtonProps) {
	return (
		<button
			onClick={openSearch}
			className={cn(
				"flex flex-row items-center gap-3 w-full h-12 px-4 rounded-full cursor-text",
				"bg-accent text-muted-foreground border border-transparent shadow-xs",
				"transition-colors duration-200 hover:border-border hover:bg-background",
				className
			)}
		>
			<SearchIcon className="size-5 shrink-0"/>
			Search apps...
			<kbd className="ml-auto hidden sm:inline-flex items-center rounded-md border bg-background px-1.5 py-0.5 font-sans text-xs">
				/
			</kbd>
		</button>
	)
}

export interface SearchSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
	const [input, setInput] = useState("");
	const [pagefind, setPagefind] = useState<PagefindClient | null>(null);
	const [results, setResults] = useState<PagefindSearchResultData[]>([]);

	useEffect(() => {
		if (import.meta.env.DEV) return;

		(async () => {
			const pfjs: PagefindClient = await import(/* @vite-ignore */ window.location.origin + "/pagefind/pagefind.js");

			pfjs.init();
			setPagefind(pfjs);
		})();
	}, [])

	useEffect(() => {
		// Results for an older query can arrive after a newer one; only the latest may win.
		let stale = false;

		pagefind?.search(input).then(async (res) => {
			const data = await Promise.all(res.results.map((r) => r.data()));
			if (!stale) setResults(data);
		})

		return () => {
			stale = true;
		}
	}, [input, pagefind])

	return (
		<Sheet
			open={open}
			onOpenChange={onOpenChange}
		>
			<SheetContent side="top" className="rounded-b-3xl pt-[env(safe-area-inset-top)]">
				<SheetHeader>
					<SheetTitle className="sr-only">
						Search apps
					</SheetTitle>
				</SheetHeader>
				<div className="container">
					<Command
						className="mb-6 bg-transparent"
						shouldFilter={false}
					>
						<CommandInput
							placeholder={import.meta.env.DEV ? "Searching is disabled in dev mode" : "Search apps..."}
							value={input}
							onValueChange={setInput}
							disabled={import.meta.env.DEV}
							className="h-12 text-base"
						/>
						<CommandList className="max-h-[60svh]">
							<CommandEmpty>
								{input.trim().length ? "No apps found. Try another name." : "Type an app name to search."}
							</CommandEmpty>
							{results.length ? results.map((app) => (
								<CommandItem
									key={app.meta.id}
									onSelect={() => {
										onOpenChange(false);
										navigate(app.url);
									}}
									className="gap-3 rounded-xl py-2"
								>
									<AppIcon
										appId={app.meta.id}
										width={40}
										height={40}
									/>
									<span className="font-semibold">{app.meta.title}</span>
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
