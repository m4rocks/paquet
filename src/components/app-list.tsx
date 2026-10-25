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
					left={<AppIcon appId={app.id} />}
				/>
			))}
		</div>
	)
}
