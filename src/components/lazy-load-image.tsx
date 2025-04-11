import { motion, type MotionStyle } from "motion/react";
import { useEffect, useState } from "react";

interface LazyLoadImageProps {
	lowResImageSrc: string;
	highResImageSrc: string;
	alt: string;
	blur?: boolean;
	loading?: "lazy" | "eager";
	className?: string;
	style?: MotionStyle;
}

export function LazyLoadImage(props: LazyLoadImageProps) {
	const [currentSrc, setCurrentSrc] = useState<string>(props.lowResImageSrc);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const loadImg = new Image();

		loadImg.onload = () => {
			setCurrentSrc(props.highResImageSrc);
			setLoaded(true);
		}

		loadImg.src = props.highResImageSrc;

		return () => {
			loadImg.onload = null;
		}
	}, [])

	return (
		<motion.img
			src={currentSrc}
			alt={props.alt}
			loading={props.loading ?? "lazy"}
			className={props.className}
			initial={{
				filter: "blur(4px)"
			}}
			style={props.style}
			variants={{
				blurred: {
					filter: "blur(4px)"
				},
				clear: {
					filter: "none"
				}
			}}
			transition={{
				ease: "easeOut",
				duration: 0.4,
			}}
			animate={loaded ? "clear" : "blurred"}
		/>
	)
}
