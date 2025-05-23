import { toast } from "sonner";
import { registerServiceWorker } from "../pwa";

const checkNetwork = async () => {
	if (!navigator.onLine) {
		return false;
	}
	const headers = new Headers();
    headers.append('cache-control', 'no-cache');
    headers.append('pragma', 'no-cache');
    try {
        await fetch(window.location.origin, { method: 'HEAD', headers });
        return true;
    } catch (error) {
        if (error instanceof TypeError) {
            return false;
        }
        throw error;
    }
}

const onNetworkChange = (online: boolean) => {
	if (!online) {
		if (!window.location.pathname.startsWith("/offline")) {
			window.location.replace("/offline");
		}
	} else {
		if (window.location.pathname.startsWith("/offline")) {
			window.location.replace("/home");
		}
	}
}

checkNetwork().then(r => onNetworkChange(r));
window.addEventListener("online", () => checkNetwork().then(r => onNetworkChange(r)));
window.addEventListener("offline", () => checkNetwork().then(r => onNetworkChange(r)));

if ("serviceWorker" in navigator) {
	registerServiceWorker();
}