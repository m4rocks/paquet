import type { CollectionEntry } from "astro:content";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { AppCard } from "../app-card";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAppResource } from "@/lib/images";
import { LazyLoadImage } from "../lazy-load-image";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";


export interface AppScreenshotsCarousel {
	appId: string;
	accentColor: string;
	screenshotsLength: number;
}

export function AppScreenshotsCarousel({ appId, screenshotsLength, accentColor }: AppScreenshotsCarousel) {
	const [api, setApi] = useState<CarouselApi>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	console.log(getAppResource(appId, "screenshot", "small", 0).src!);

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
				skipSnaps: true,
				align: "start",
			}}
			plugins={[WheelGesturesPlugin()]}
			setApi={setApi}
			className="w-full"
		>
			<CarouselContent>
				{Array(screenshotsLength).fill(null).map((_, idx) => (
					<CarouselItem
						className="basis-full lg:basis-1/2 h-100"
						key={idx}
					>
						<div
							className="w-full h-full rounded-lg overflow-hidden flex justify-center items-center p-4"
							style={{
								backgroundColor: accentColor + "99"
							}}
						>
							<LazyLoadImage
								lowResImageSrc={getAppResource(appId, "screenshot", "small", idx).src!}
								highResImageSrc={getAppResource(appId, "screenshot", "large", idx).src!}
								alt={"screenshot-" + idx}
								className="max-w-full max-h-full w-full h-full object-contain"
							/>
						</div>
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
