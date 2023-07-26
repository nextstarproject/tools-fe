interface Window {
	/**
	 * @description !!! _devHelper only available in dev mode's console, your code should not use it
	 * */
	_devHelper: unknown;
	/**
	 * @description browser default language
	 * */
	_LANGUAGE_: "zh-CN" | "en-US";
	/**
	 * @description iconfont url
	 * */
	_ICON_FONT_URL_: string;
	/**
	 * @description park icon url
	 * */
	_ICON_PARK_URL_: string;
	/**
	 * @description 百度统计
	 * */
	_BAIDU_COUNT_: string;
	/**
	 * @description 谷歌分析
	 * */
	_GOOGLE_TAG_: string;
	/**
	 * @description 用来调用google分析
	 * */
	_googleTag: any;
	/**
	 * @description oauth2 认证服务器地址
	 * */
	_AUTHORITY_ENDPOINT_: string;

	/**
	 * @description 用户指纹Id
	 */
	_FINGERPRINT_: string;
}

type Styling<T> = {
	style?: React.CSSProperties;
	className?: string;
} & T;

type Nullable<T> = T | null;
type ValueOf<T> = T[keyof T];

declare module "@fingerprintjs/fingerprintjs";

/**
 * vite config define global variable
 */
declare const _PROJECT_NAMESPACE_: string;
declare const _MAIN_VERSION_: string;
declare const _BUILD_VERSION_: string;
declare const _IS_DEV_: boolean;
