import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { IServiceResponse } from "./types";

/**
 *
 * @description 创建自定义 `serviceApi<IServiceResponse<T>>` 请求
 * @param defaultConfiguration 默认配置，比如BaseURL
 * @param configAxiosInstance 自定义拦截器，设置拦截处理
 * @param customRequestDefaultConfig 自定义请求配置
 * @returns serviceApi<IServiceResponse<T>> method
 * @example
 *
 * create custom request config
 * ```ts
 * type CustomRequestOptions = {
 *     isAutoLoading?: boolean;
 * };
 * ```
 * create service api
 * ```ts
 * const serviceApi = serviceApiCreate<CustomRequestOptions>(
 * 	{
 * 		baseURL: "https://baidu.com",
 * 	},
 * 	undefined,
 * 	{
 * 		isAutoLoading: false,
 * 	}
 * );
 * ```
 *
 * use
 *
 * ```ts
 * serviceApi<string>("/api/test", { method: "get" }, { isAutoLoading: true });
 * ```
 */
export function serviceApiCreate<C = unknown>(
	defaultConfiguration: CreateAxiosDefaults<unknown>,
	configAxiosInstance?: (axiosInstance: AxiosInstance) => void,
	customRequestDefaultConfig?: C
) {
	const axiosInstance = axios.create(defaultConfiguration);
	if (configAxiosInstance != undefined) {
		configAxiosInstance(axiosInstance);
	}
	return async function serviceApi<T = unknown>(
		url: string,
		requestConfig: AxiosRequestConfig = {},
		customConfig?: C
	): AxiosPromise<IServiceResponse<T>> {
		let config = requestConfig;
		if (customRequestDefaultConfig != undefined) {
			config = { ...config, ...customRequestDefaultConfig };
		}
		if (customConfig != undefined) {
			config = { ...config, ...customConfig };
		}
		let response: never;
		try {
			response = await axiosInstance(url, {
				...config,
			});
		} catch (reason) {
			response = await Promise.reject(reason);
		}
		return await Promise.resolve(response);
	};
}

/**
 *
 * @description 创建自定义 `serviceApi<R>` 请求
 * @param defaultConfiguration 默认配置，比如BaseURL
 * @param configAxiosInstance 自定义拦截器，设置拦截处理
 * @param customRequestDefaultConfig 自定义请求配置
 * @returns serviceApi<R> method
 * @example
 *
 * create custom request config
 * ```ts
 * type CustomRequestOptions = {
 *     isAutoLoading?: boolean;
 * };
 * ```
 * create service api
 * ```ts
 * const serviceApi = serviceApiNormalCreate<CustomRequestOptions>(
 * 	{
 * 		baseURL: "https://baidu.com",
 * 	},
 * 	undefined,
 * 	{
 * 		isAutoLoading: false,
 * 	}
 * );
 * ```
 *
 * use
 *
 * ```ts
 * serviceApi<string[]>("/api/test", { method: "get" }, { isAutoLoading: true });
 * ```
 *
 * return data is `string[]`
 */
export function serviceApiNormalCreate<C = unknown>(
	defaultConfiguration: CreateAxiosDefaults<unknown>,
	configAxiosInstance?: (axiosInstance: AxiosInstance) => void,
	customRequestDefaultConfig?: C
) {
	const axiosInstance = axios.create(defaultConfiguration);
	if (configAxiosInstance != undefined) {
		configAxiosInstance(axiosInstance);
	}
	return async function serviceApi<R = unknown>(
		url: string,
		requestConfig: AxiosRequestConfig = {},
		customConfig?: C
	): AxiosPromise<R> {
		let config = requestConfig;
		if (customRequestDefaultConfig != undefined) {
			config = { ...config, ...customRequestDefaultConfig };
		}
		if (customConfig != undefined) {
			config = { ...config, ...customConfig };
		}
		let response: never;
		try {
			response = await axiosInstance(url, {
				...config,
			});
		} catch (reason) {
			response = await Promise.reject(reason);
		}
		return await Promise.resolve(response);
	};
}
