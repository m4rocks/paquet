import type { CollectionEntry } from "astro:content";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { AppCard } from "../app-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";


export interface AppCardCarouselProps {
	apps: CollectionEntry<"apps">[];
}

export function AppCardCarousel({ apps }: AppCardCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	useEffect(() => {
		if (!api) return;

		const cb = () => {
			setCanScrollNext(api.canScrollNext());
			setCanScrollPrev(api.canScrollPrev());
		}

		cb();
		api.on("scroll", cb);
		api.on("reInit", cb);

		return () => {
			api.off("scroll", cb);
			api.off("reInit", cb);
		}
	}, [api])

	return (
		<Carousel
			opts={{
				skipSnaps: true,
				align: "start"
			}}
			plugins={[WheelGesturesPlugin()]}
			setApi={setApi}
			className="w-full"
		>
			<CarouselContent>
				{apps.map((app) => (
					<CarouselItem
						className="basis-[85%] md:basis-1/2 lg:basis-1/3"
						key={app.id}
					>
						<a
							href={`/app/${app.id}`}
							className="block aspect-[17/10] rounded-3xl transition-[scale] duration-200 ease-out active:scale-[0.98]"
						>
							<AppCard
								app={app}
							/>
						</a>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious
				className="hidden xl:inline-flex"
			/>
  			<CarouselNext
				className="hidden xl:inline-flex"
			/>

			<div className="flex flex-row justify-center items-center gap-2 xl:hidden">
				<Button
					size="icon"
					variant="outline"
					className="rounded-full mt-3 ml-auto"
					disabled={!canScrollPrev}
					onClick={() => api?.scrollPrev()}
				>
					<ArrowLeftIcon/>
					<span className="sr-only">Previous apps</span>
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full mt-3 mr-auto"
					disabled={!canScrollNext}
					onClick={() => api?.scrollNext()}
				>
					<ArrowRightIcon/>
					<span className="sr-only">Next apps</span>
				</Button>
			</div>
		</Carousel>
	)
}
