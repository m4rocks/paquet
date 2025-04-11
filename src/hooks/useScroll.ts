import { useEffect, useState } from "react";

type Props = {
	threshold?: number;
};

export const useScroll = ({ threshold = 0 }: Props) => {
	const [triggered, setTriggered] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setTriggered(window.scrollY > threshold);
		};
		
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return triggered;
};
