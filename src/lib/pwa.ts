import { toast } from "sonner";
import { registerSW } from "virtual:pwa-register";

export const registerServiceWorker = () => {
	let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined;
	
	refreshSW = registerSW({
		immediate: true,
		onNeedRefresh: () => {
			toast.info("A new update is available for Paquet", {
				action: {
					label: "Update",
					onClick: () => refreshSW?.(true)
				},
				dismissible: false,
				closeButton: false,
				duration: Infinity
			});
		}
	});
}

