import { cn } from "@/lib/utils";
import type React from "react"

export interface HeaderProps {
	children: React.ReactNode;
	className?: string
}

export function Header({ children, className }: HeaderProps) {
	return (
		<h1 className={cn("md:mt-8 mt-16 text-5xl md:text-7xl font-bold", className)}>
			{children}
		</h1>
	)
}