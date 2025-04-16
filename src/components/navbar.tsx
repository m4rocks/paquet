import { useScroll } from "@/hooks/useScroll";
import { cn, getContrastColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";

export interface NavbarProps {
	title?: string;
	color?: string;
	back?: boolean;
}

export function Navbar({ title, back, color }: NavbarProps) {
	const scrollDownTrigger = useScroll({ threshold: 64 });

	const handleBack = () => {
		window.history.back();
	}

	return (
		<nav
			className={cn(
				"transition-colors duration-200 ease-out fixed top-0 left-0 right-0 h-16 p-4 pt-[calc(1rem_+_env(safe-area-inset-top))] flex flex-row items-center gap-2 z-50",
				scrollDownTrigger ? "bg-background shadow-sm border-b" : "bg-transparent"
			)}
		>
			{back ?

				<Button
					size="icon"
					variant="ghost"
					onClick={handleBack}
				>
					<ChevronLeftIcon
						className="w-8! h-8!"
						style={{
							color: (!scrollDownTrigger && color) ? getContrastColor(color) : undefined
						}}
					/>
				</Button>
			: null}
			<p
				className={cn("text-xl font-bold line-clamp-1 transition-opacity", scrollDownTrigger ? "opacity-100" : "opacity-0")}
			>
				{title}
			</p>
		</nav>
	)
}
