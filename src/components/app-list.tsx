import { AppIcon } from "./app-icon";
import { ListItem } from "./ui/list-item";

export interface AppListProps {
	apps: { id: string, data: { name: string, author: string } }[]
}

export function AppList({ apps }: AppListProps) {
	return (
		<div className="flex flex-col gap-2">
			{apps.map((app, idx) => (
				<ListItem
					key={app.id}
					title={app.data.name}
					subtitle={app.data.author}
					href={`/app/${app.id}`}
					separator={idx !== apps.length - 1}
					left={<AppIcon appId={app.id} width={56} height={56} />}
					right={<ViewPill/>}
				/>
			))}
		</div>
	)
}

// A span, not a link: the whole row is already the link to the app page.
function ViewPill() {
	return (
		<span className="shrink-0 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-link transition-colors group-hover/list-item:bg-primary group-hover/list-item:text-primary-foreground dark:bg-primary/20 dark:group-hover/list-item:bg-primary">
			View
		</span>
	)
}
