export const decodeResourceUrl = (url: string) => url
	.replaceAll("&amp;", "&")

export const iconSizes = {
	medium: {
		width: 128,
		height: 128
	},
} as const;

export const coverSizes = {
	small: {
		width: 85,
		height: 50
	},
	medium: {
		width: 680,
		height: 400
	},
	large: {
		width: 1024,
		height: 600
	}
} as const;

export const screenshotSizes = {
	small: {
		width: 85,
		height: 50
	},
	large: {
		width: 1024,
		height: 600
	}
} as const;

type ResourceType = "icon" | "cover" | "screenshot"

interface GetAppResourceUrlReturn {
	src: string | null;
	width: number;
	height: number;
}

export function getAppResource(id: string, type: "icon"): GetAppResourceUrlReturn;
export function getAppResource(id: string, type: "cover", size: keyof typeof coverSizes): GetAppResourceUrlReturn;
export function getAppResource(id: string, type: "screenshot", size: keyof typeof screenshotSizes, index: number): GetAppResourceUrlReturn;

export function getAppResource(id: string, type: ResourceType, size?: string, index?: number): GetAppResourceUrlReturn {
	if (type === "icon") {
		return {
			src: `/api/images/${id}/icon.webp`,
			width: iconSizes["medium"].width,
			height: iconSizes["medium"].height
		}
	}

	if (type === "cover") {
		if (!size) return {
			src: null,
			width: 0,
			height: 0
		};

		return {
			src: `/api/images/${id}/cover/${size}.webp`,
			width: coverSizes[size as keyof typeof coverSizes].width,
			height: coverSizes[size as keyof typeof coverSizes].height
		}
	}

	if (type === "screenshot") {
		if (!size) return {
			src: null,
			width: 0,
			height: 0
		};
		if (typeof index !== "number") return {
			src: null,
			width: 0,
			height: 0
		};

		return {
			src: `/api/images/${id}/screenshot/${index}/${size}.webp`,
			width: screenshotSizes[size as keyof typeof screenshotSizes].width,
			height: screenshotSizes[size as keyof typeof screenshotSizes].height
		}
	}

	return {
		src: null,
		width: 0,
		height: 0
	};
}