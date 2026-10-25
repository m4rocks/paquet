import { BriefcaseIcon, CodeIcon, Gamepad2Icon, HammerIcon, HeartIcon, MusicIcon, NewspaperIcon, UsersIcon, VideoIcon, type LucideIcon } from "lucide-react";

export interface Category {
	id: string,
	icon: LucideIcon,
	name: string,
	/** Tints the category's chips and tiles. Mid lightness so it reads on both themes. */
	color: string,
	aliases: string[]
}


export const categories = [
	{
		id: "news",
		icon: NewspaperIcon,
		name: "News",
		color: "oklch(0.65 0.16 245)",
		aliases: []
	},
	{
		id: "social",
		icon: UsersIcon,
		name: "Social",
		color: "oklch(0.68 0.17 350)",
		aliases: ["chat", "messenger", "messaging"],
	},
	{
		id: "entertainment",
		icon: VideoIcon,
		name: "Entertainment",
		color: "oklch(0.66 0.19 25)",
		aliases: ["video", "movies", "tv", "streaming"],
	},
	{
		id: "utilities",
		icon: HammerIcon,
		name: "Utilities",
		color: "oklch(0.72 0.15 70)",
		aliases: ["tool", "tools", "utility"],
	},
	{
		id: "productivity",
		icon: BriefcaseIcon,
		name: "Productivity",
		color: "oklch(0.66 0.12 180)",
		aliases: ["work", "business", "office", "education"],
	},
	{
		id: "games",
		icon: Gamepad2Icon,
		name: "Games",
		color: "oklch(0.62 0.18 300)",
		aliases: ["game", "gaming"],
	},
	{
		id: "music",
		icon: MusicIcon,
		name: "Music",
		color: "oklch(0.66 0.17 150)",
		aliases: ["audio", "sound"],
	},
	{
		id: "development",
		icon: CodeIcon,
		name: "Development",
		color: "oklch(0.65 0.13 225)",
		aliases: [
			"code",
			"coding",
			"program",
			"programming",
			"developer",
			"developers"
		],
	},
	{
		id: "lifestyle",
		icon: HeartIcon,
		name: "Lifestyle",
		color: "oklch(0.69 0.17 50)",
		aliases: ["photo", "travel", "trip", "health", "books"],
	},
] as const satisfies Category[];

export const getCategory = (id: string): Category | undefined => categories.find((c) => c.id === id);
