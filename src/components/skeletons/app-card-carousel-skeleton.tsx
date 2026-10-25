import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function AppCardCarouselSkeleton() {
	return (
		<div className="flex flex-col overflow-hidden">
			<div className="flex flex-row gap-4">
				<Skeleton
					className="basis-[85%] md:basis-1/2 lg:basis-1/3 shrink-0 aspect-[17/10] rounded-3xl"
				/>
				<Skeleton
					className="basis-[85%] md:basis-1/2 lg:basis-1/3 shrink-0 aspect-[17/10] rounded-3xl"
				/>
				<Skeleton
					className="hidden lg:block basis-1/3 shrink-0 aspect-[17/10] rounded-3xl"
				/>
			</div>
			<div className="flex flex-row justify-center items-center gap-2 xl:hidden">
				<Button 
					size="icon" 
					variant="outline" 
					className="rounded-full mt-3 ml-auto"
					disabled
				>
					<ArrowLeftIcon/>
				</Button>
				<Button 
					size="icon" 
					variant="outline" 
					className="rounded-full mt-3 mr-auto"
					disabled
				>
					<ArrowRightIcon/>
				</Button>
			</div>
		</div>
	)
}
