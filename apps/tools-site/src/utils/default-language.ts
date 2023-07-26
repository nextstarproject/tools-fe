import { Languages } from "nsp-i18n";
import { nsLocalStorage } from "./storage";
export const defaultLanguage = (): Languages => {
	const localStorageLanguage = nsLocalStorage.get("language") || window._LANGUAGE_;
	let defaultLang: Languages = "en-US";
	switch (localStorageLanguage) {
		case "zh-CN":
			defaultLang = "zh-CN";
			break;
		case "en-US":
			defaultLang = "en-US";
			break;
		default:
			defaultLang = "en-US";
			break;
	}

	return defaultLang;
};
