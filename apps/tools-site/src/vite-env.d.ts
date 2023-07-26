/// <reference types="vite/client" />
/// <reference types="./vite-env-override.d.ts" />
interface ImportMetaEnv {
	/**
	 * @description Sentry 是否启用
	 * @default false
	 * */
	readonly NSP_SENTRY: "true" | "false";
	/**
	 * @description Sentry api key
	 * @default <api key>
	 * */
	readonly NSP_SENTRY_KEY: string;
	/**
	 * @description Sentry environment
	 * */
	readonly NSP_SENTRY_ENV: string;
	/**
	 * @description 登录 是否启用
	 * @default false
	 * */
	readonly NSP_LOGIN_STATUS: "true" | "false";
	/**
	 * @description 主题配置 是否启用
	 * @default false
	 * */
	readonly NSP_THEME_CONFIG: "true" | "false";
	/**
	 * @description 国际化 是否启用
	 * @default false
	 * */
	readonly NSP_LANGUAGE: "true" | "false";
	/**
	 * @description 百度统计是否启用
	 * @default false
	 * */
	readonly NSP_BAIDU_COUNT: "true" | "false";
	/**
	 * @description 谷歌分析是否启用
	 * @default false
	 * */
	readonly NSP_GOOGLE_TAG: "true" | "false";
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
