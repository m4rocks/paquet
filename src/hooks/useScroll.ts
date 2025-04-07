import { useEffect, useState } from "react";

type Props = {
	threshold?: number;
};

export const useScroll = ({ threshold = 0 }: Props) => {
	const [triggered, setTriggered] = useState(globalThis.scrollY > threshold);

	useEffect(() => {
		const handleScroll = () => {
			setTriggered(globalThis.scrollY > threshold);
		};

		globalThis.addEventListener("scroll", handleScroll);

		return () => {
			globalThis.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return triggered;
};
