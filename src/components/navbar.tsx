import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, HomeIcon, LayoutGridIcon, SearchIcon, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { onOpenSearch, SearchSheet } from "./search-sheet";
import { activeTab, type TabId } from "@/lib/navigation";

export interface NavbarProps {
	title?: string;
	back?: boolean;
	pathname: string;
	tint?: string;
	hideTabBar?: boolean;
}

interface Tab {
	id: TabId;
	name: string;
	href: string;
	icon: LucideIcon;
}

const TABS: Tab[] = [
	{ id: "home", name: "Home", href: "/home", icon: HomeIcon },
	{ id: "categories", name: "Categories", href: "/categories", icon: LayoutGridIcon },
];

const isTypingTarget = (target: EventTarget | null) =>
	target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export function Navbar({ title, back, pathname, tint, hideTabBar }: NavbarProps) {
	const scrollDownTrigger = useScroll({ threshold: 64 });
	const [searchOpen, setSearchOpen] = useState(false);
	const currentTab = activeTab(pathname);

	useEffect(() => onOpenSearch(() => setSearchOpen(true)), []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const commandK = e.key === "k" && (e.metaKey || e.ctrlKey);
			const slash = e.key === "/" && !isTypingTarget(e.target);
			if (!commandK && !slash) return;

			e.preventDefault();
			setSearchOpen(true);
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleBack = () => {
		window.history.back();
	}

	return (
		<>
			<nav
				className={cn(
					"transition-[background-color,box-shadow] duration-200 ease-out fixed top-0 left-0 right-0 h-[calc(4rem_+_env(safe-area-inset-top))] p-4 pt-[calc(1rem_+_env(safe-area-inset-top))] flex flex-row items-center gap-2 z-50",
					scrollDownTrigger ? "bg-background shadow-sm border-b" : "bg-transparent"
				)}
				style={!scrollDownTrigger && tint ? { backgroundColor: tint } : undefined}
			>
				{back ?
					<Button
						size="icon"
						variant="ghost"
						className="rounded-full cursor-pointer"
						onClick={handleBack}
						aria-label="Go back"
					>
						<ChevronLeftIcon
							className="w-8! h-8!"
						/>
					</Button>
					:
					<a
						href="/home"
						aria-label="Paquet"
						className="hidden sm:flex flex-row items-center rounded-full"
					>
						<span className="size-9 overflow-hidden rounded-[23%] shadow-sm">
							{/* The logo file has a wide white margin, so it is scaled up and clipped into an app icon shape. */}
							<img src="/logo.png" alt="" width={36} height={36} className="size-full scale-[1.9]" />
						</span>
					</a>
				}
				<p
					className={cn("text-xl font-bold line-clamp-1 transition-opacity", scrollDownTrigger ? "opacity-100" : "opacity-0")}
				>
					{title}
				</p>

				{/* Over a tint the controls sit on an opaque pill, so their contrast does not depend on the app's colour. */}
				<div className={cn("ml-auto hidden sm:flex flex-row items-center gap-1 rounded-full border border-transparent p-1", !scrollDownTrigger && tint && "border-border bg-background shadow-sm")}>
					{TABS.map((tab) => (
						<a
							key={tab.href}
							href={tab.href}
							aria-current={tab.id === currentTab ? "page" : undefined}
							className={cn(
								"rounded-full px-4 py-2 text-sm font-semibold transition-colors",
								tab.id === currentTab ? "bg-primary/10 text-link dark:bg-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent"
							)}
						>
							{tab.name}
						</a>
					))}
					<button
						onClick={() => setSearchOpen(true)}
						className="ml-2 flex flex-row items-center gap-2 rounded-full border bg-background/60 py-1.5 pl-3 pr-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
					>
						<SearchIcon className="size-4" />
						Search
						<kbd className="rounded-full bg-accent px-2 py-0.5 font-sans text-xs">/</kbd>
					</button>
				</div>
			</nav>

			{!hideTabBar ?
				<nav
					aria-label="Main"
					// Sticky rather than fixed: with fixed, iOS Safari shows the page below the bar once its toolbar shrinks. order-last puts it at the end of the body.
					className="sm:hidden sticky bottom-0 order-last z-50 border-t bg-background pb-[env(safe-area-inset-bottom)]"
				>
					<div className="grid grid-cols-3 h-16">
						{TABS.map((tab) => (
							<TabBarItem
								key={tab.href}
								href={tab.href}
								icon={tab.icon}
								// While search is open it is the only highlighted tab.
								active={!searchOpen && tab.id === currentTab}
							>
								{tab.name}
							</TabBarItem>
						))}
						<TabBarItem
							icon={SearchIcon}
							active={searchOpen}
							onClick={() => setSearchOpen(true)}
						>
							Search
						</TabBarItem>
					</div>
				</nav>
				: null}

			<SearchSheet
				open={searchOpen}
				onOpenChange={setSearchOpen}
			/>
		</>
	)
}

interface TabBarItemProps {
	children: React.ReactNode;
	icon: LucideIcon;
	active: boolean;
	href?: string;
	onClick?: () => void;
}

function TabBarItem({ children, icon: Icon, active, href, onClick }: TabBarItemProps) {
	const Root = href ? "a" : "button";

	return (
		<Root
			href={href}
			onClick={onClick}
			aria-current={href && active ? "page" : undefined}
			className={cn(
				"group flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors",
				active ? "text-link" : "text-muted-foreground"
			)}
		>
			<span
				className={cn(
					"flex h-8 w-14 items-center justify-center rounded-full transition-[background-color,scale] duration-300 ease-out group-active:scale-90",
					active ? "bg-primary/15 dark:bg-primary/25" : ""
				)}
			>
				<Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
			</span>
			{children}
		</Root>
	)
}
