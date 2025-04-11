import { useScroll } from "@/hooks/useScroll";
import { combineColors } from "@/lib/utils";

export interface ThemeColorProps {
	color?: string;
}

export function ThemeColor({ color }: ThemeColorProps) {
	const scrollTrigger = useScroll({ threshold: 16 });
	const darkBg = "#09090B";
	const lightBg = "#ffffff";

	return (
		<>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: dark)"
				content={(!scrollTrigger && color) ? combineColors(color, darkBg) : darkBg}
			/>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content={(!scrollTrigger && color) ? combineColors(color, lightBg) : lightBg}
			/>
		</>
	)
}