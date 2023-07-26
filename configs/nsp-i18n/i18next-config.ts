import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface NestedObj {
	[key: string]: string | NestedObj;
}

export type Languages = "zh-CN" | "en-US";
export type TranslationResources = {
	"zh-CN": {
		[key: string]: NestedObj;
	};
	"en-US": {
		[key: string]: NestedObj;
	};
};

/**
 * this method init i18next instance
 * @param defaultLang default language, e.g. 'zh_CN'
 * @param translations translation object, usually generate by i18n-parser , e.g. { zh-CN: {}, en-US: {} }
 */
export const initI18nextConfig = (defaultLang: Languages, translations: TranslationResources) => {
	i18n.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			defaultNS: "translation",
			ns: ["translation"],
			resources: translations,
			lng: defaultLang,
			fallbackLng: defaultLang,
			nsSeparator: ":",
			keySeparator: ".", // we do not use keys in form messages.welcome
			interpolation: {
				escapeValue: false, // react already safes from xss
			},
		});
};

export { i18n as i18nInstance };
