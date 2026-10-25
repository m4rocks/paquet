import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../ui/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getAppResource } from "@/lib/images";
import { LazyLoadImage } from "../lazy-load-image";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";


export interface AppScreenshotsCarousel {
	appId: string;
	appName: string;
	accentColor: string;
	screenshotsLength: number;
}

export function AppScreenshotsCarousel({ appId, appName, screenshotsLength, accentColor }: AppScreenshotsCarousel) {
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
				align: "start",
			}}
			plugins={[WheelGesturesPlugin()]}
			setApi={setApi}
			className="w-full"
		>
			<CarouselContent>
				{Array(screenshotsLength).fill(null).map((_, idx) => (
					<CarouselItem
						className="basis-[85%] lg:basis-1/2 h-100"
						key={idx}
					>
						<div
							className="w-full h-full rounded-3xl overflow-hidden flex justify-center items-center p-4"
							style={{
								backgroundColor: `color-mix(in oklab, ${accentColor} 35%, var(--card))`
							}}
						>
							<LazyLoadImage
								lowResImageSrc={getAppResource(appId, "screenshot", "small", idx).src!}
								highResImageSrc={getAppResource(appId, "screenshot", "large", idx).src!}
								alt={`${appName} screenshot ${idx + 1}`}
								className="max-w-full max-h-full w-full h-full object-contain rounded-xl drop-shadow-lg"
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
					className="rounded-full mt-3 ml-auto"
					disabled={!canScrollPrev}
					onClick={() => api?.scrollPrev()}
				>
					<ArrowLeftIcon/>
					<span className="sr-only">Previous screenshot</span>
				</Button>
				<Button
					size="icon"
					variant="outline"
					className="rounded-full mt-3 mr-auto"
					disabled={!canScrollNext}
					onClick={() => api?.scrollNext()}
				>
					<ArrowRightIcon/>
					<span className="sr-only">Next screenshot</span>
				</Button>
			</div>
		</Carousel>
	)
}
