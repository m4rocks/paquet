// Apps flag the platforms they are optimized for; an app that flags neither gets no label rather than a guess.
export const platformLabel = (features: string[]): string | null => {
	const desktop = features.includes("desktop");
	const mobile = features.includes("mobile");

	if (desktop && mobile) return "Desktop & mobile";
	if (desktop) return "Desktop";
	if (mobile) return "Mobile";
	return null;
}
