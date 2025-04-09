import { WIDTH, HEIGHT } from "@/pages/api/images/[id]/icon.webp";
import { sizes as coverSizes } from "@/pages/api/images/[id]/cover/[size].webp";
import { sizes as screenshotSizes} from "@/pages/api/images/[id]/screenshot/[index]/[size].webp";

type ResourceType = "icon" | "cover" | "screenshot"

interface GetAppResourceUrlReturn {
	src: string;
	width: number;
	height: number;
}

export function getAppResource(id: string, type: "icon"): GetAppResourceUrlReturn;
export function getAppResource(id: string, type: "cover", size: keyof typeof coverSizes): GetAppResourceUrlReturn;
export function getAppResource(id: string, type: "screenshot", size: keyof typeof screenshotSizes, index: number): GetAppResourceUrlReturn;

export function getAppResource(id: string, type: ResourceType, size?: string, index?: number) {
	if (type === "icon") {
		return {
			src: `/api/images/${id}/icon.webp`,
			width: WIDTH,
			height: HEIGHT
		}
	}

	if (type === "cover") {
		if (!size) return null;

		return {
			src: `/api/images/${id}/cover/${size}.webp`,
			width: coverSizes[size as keyof typeof coverSizes].width,
			height: coverSizes[size as keyof typeof coverSizes].height
		}
	}

	if (type === "screenshot") {
		if (!size) return null;
		if (!index) return null;

		return {
			src: `/api/images/${id}/cover/${index}/${size}.webp`,
			width: screenshotSizes[size as keyof typeof screenshotSizes].width,
			height: screenshotSizes[size as keyof typeof screenshotSizes].height
		}
	}
}