import { useEffect, useState } from "react";

// Starts false so the server render and the first client render match.
export const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const list = window.matchMedia(query);
		const update = () => setMatches(list.matches);

		update();
		list.addEventListener("change", update);

		return () => list.removeEventListener("change", update);
	}, [query]);

	return matches;
};
