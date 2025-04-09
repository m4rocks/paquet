import type { CollectionEntry } from "astro:content";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { AppCardClient, AppCardServer } from "../app-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";


export interface AppCardCarouselProps {
	apps: CollectionEntry<"apps">[];
	coverImages: [lowResImage: string, highResImage: string][];
}

export function AppCardCarousel({ apps, coverImages }: AppCardCarouselProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	useEffect(() => {
		if (!api) return;

		api.on("scroll", () => {
			setCanScrollNext(api.canScrollNext());
			setCanScrollPrev(api.canScrollPrev());
		})
	})

	return (
		<Carousel
			opts={{
				skipSnaps: true
			}}
			setApi={setApi}
			className="w-full"
		>
			<CarouselContent>
				{apps.map((app, idx) => (
					<CarouselItem
						className="md:basis-1/3 h-48"
						key={app.id}
					>
						<a href={app.data.url}>
							<AppCardClient
								app={app}
								lowResImage={coverImages[idx][0]}
								highResImage={coverImages[idx][1]}
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