import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";

export interface AppListItemSkeletonProps {
	separator?: boolean;
}

export function AppListItemSkeleton({ separator }: AppListItemSkeletonProps) {
	return (
		<>
			<div
				className="flex flex-row gap-4 p-2 rounded-lg items-center transition-colors"
			>
				<Skeleton
					className="w-12 h-12 rounded-lg"
				/>
				<div>
					<Skeleton className="w-32 h-4 mb-2"/>
					<Skeleton className="w-16 h-3"/>
				</div>
			</div>
			{separator ? <Separator/> : null}
		</>
	)
}
