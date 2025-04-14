import { toast } from "sonner";
import { registerSW } from "virtual:pwa-register";

typeof window !== undefined ? window.addEventListener("load", () => {
	let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

	refreshSW = registerSW({
		immediate: true,
		onOfflineReady() {
			toast.info("Paquet has been installed, it will work even faster");
		},
		onNeedRefresh: () => {
			toast.info("A new update is available for Paquet", {
				action: {
					label: "Update",
					onClick: () => refreshSW?.(true)
				}
			})
		}
	})
}) : null;
