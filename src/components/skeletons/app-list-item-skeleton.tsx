import { Separator } from "@/components/ui/separator";
import { Skeleton } from "../ui/skeleton";

export interface AppListItemSkeletonProps {
	separator?: boolean;
}

export function AppListItemSkeleton({ separator }: AppListItemSkeletonProps) {
	return (
		<>
			<div
				className="flex flex-row gap-4 p-2 rounded-xl items-center"
			>
				<Skeleton
					className="size-14 rounded-[23%]"
				/>
				<div className="flex-1">
					<Skeleton className="w-32 h-4 mb-2"/>
					<Skeleton className="w-16 h-3"/>
				</div>
				<Skeleton className="w-16 h-8 rounded-full"/>
			</div>
			{separator ? <Separator/> : null}
		</>
	)
}
