import { BriefcaseIcon, CodeIcon, Gamepad2Icon, HammerIcon, HeartIcon, MusicIcon, NewspaperIcon, UsersIcon, VideoIcon, type Icon } from "lucide-react";

export interface Category {
	id: string,
	icon: typeof Icon,
	name: string,
	aliases: string[]
}


export const CATEGORIES = [
	{
		id: "news",
		icon: NewspaperIcon,
		name: "News",
		aliases: []
	},
	{
		id: "social",
		icon: UsersIcon,
		name: "Social",
		aliases: ["chat", "messenger", "messaging"],
	},
	{
		id: "entertainment",
		icon: VideoIcon,
		name: "Entertainment",
		aliases: ["video", "movies", "tv", "streaming"],
	},
	{
		id: "utilities",
		icon: HammerIcon,
		name: "Utilities",
		aliases: ["tool", "tools", "utility"],
	},
	{
		id: "productivity",
		icon: BriefcaseIcon,
		name: "Productivity",
		aliases: ["work", "business", "office", "education"],
	},
	{
		id: "games",
		icon: Gamepad2Icon,
		name: "Games",
		aliases: ["game", "gaming"],
	},
	{
		id: "music",
		icon: MusicIcon,
		name: "Music",
		aliases: ["audio", "sound"],
	},
	{
		id: "development",
		icon: CodeIcon,
		name: "Development",
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
		aliases: ["photo", "travel", "trip", "health", "books"],
	},
] as const satisfies Category[];
