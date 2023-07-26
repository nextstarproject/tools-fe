import { i18nInstance, initI18nextConfig } from "nsp-i18n";
import enUSResource from "@project-self/locales/en-US.json";
import zhCNResource from "@project-self/locales/zh-CN.json";
import { defaultLanguage } from "@project-self/utils/default-language";

export const initI18nConfig = () => {
	const resources = {
		"zh-CN": {
			translation: zhCNResource,
		},
		"en-US": {
			translation: enUSResource,
		},
	};

	initI18nextConfig(defaultLanguage(), resources);
};

export { i18nInstance };
