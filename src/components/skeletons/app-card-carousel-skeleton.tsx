import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function AppCardCarouselSkeleton() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row gap-4">
				<Skeleton
					className="md:basis-1/2 lg:basis-1/3 w-full h-48 rounded-lg"
				/>
				<Skeleton
					className="hidden md:block md:basis-1/2 lg:basis-1/3 w-full h-48 rounded-lg"
				/>
				<Skeleton
					className="hidden lg:block basis-1/3 w-full h-48 rounded-lg"
				/>
			</div>
			<div className="flex flex-row justify-center items-center gap-2 xl:hidden">
				<Button 
					size="icon" 
					variant="outline" 
					className="rounded-full mt-2 ml-auto"
					disabled
				>
					<ArrowLeftIcon/>
				</Button>
				<Button 
					size="icon" 
					variant="outline" 
					className="rounded-full mt-2 mr-auto"
					disabled
				>
					<ArrowRightIcon/>
				</Button>
			</div>
		</div>
	)
}