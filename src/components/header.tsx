import { cn } from "@/lib/utils";
import type React from "react"

export interface HeaderProps {
	children: React.ReactNode;
	className?: string
}

export function Header({ children, className }: HeaderProps) {
	return (
		<h1 className={cn("mt-8 text-5xl md:text-7xl font-bold", className)}>
			{children}
		</h1>
	)
}