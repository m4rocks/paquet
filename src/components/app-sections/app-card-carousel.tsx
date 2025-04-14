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
		if (api) {
			const cb = () => {
				setCanScrollNext(api.canScrollNext());
				setCanScrollPrev(api.canScrollPrev());
			}
	
			api.on("scroll", cb);
	
			return () =>  {
				api.off("scroll", cb)
			}
		};
	})

	return (
		<Carousel
			opts={{
				skipSnaps: true,
				align: "center"
			}}
			plugins={[WheelGesturesPlugin()]}
			setApi={setApi}
			className="w-full"
		>
			<CarouselContent>
				{apps.map((app) => (
					<CarouselItem
						className="md:basis-1/2 lg:basis-1/3 h-48"
						key={app.id}
					>
						<a href={`/app/${app.id}`}>
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
					className="rounded-full mt-2 ml-auto"
					disabled={!canScrollPrev}
					onClick={() => api?.scrollPrev()}
				>
					<ArrowLeftIcon/>
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full mt-2 mr-auto"
					disabled={!canScrollNext}
					onClick={() => api?.scrollNext()}
				>
					<ArrowRightIcon/>
				</Button>
			</div>
		</Carousel>
	)
}
