import Logger from "@project-self/utils/logger";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const DefaultCommonSearchParamsKey = "memoryParams";

/**
 * 共通设置内部查询参数
 * @param defaultParams must is object
 * @param defaultParamsKey [defalut: memoryParams]
 * @returns
 */
export default function useCommonSearchParams<T>(
	defaultParams: T,
	defaultParamsKey = DefaultCommonSearchParamsKey
): [T, (key: T) => void] {
	if (typeof defaultParams != "object") {
		throw "useCommonParams default value must is object";
	}
	const [searchParams, setSearchParams] = useSearchParams();
	let paramsValue = defaultParams;

	try {
		const tab = searchParams.get(defaultParamsKey)?.toString();
		if (tab != undefined) {
			const temp = JSON.parse(atob(decodeURIComponent(tab))) as T;
			if (temp != null && temp != undefined) {
				paramsValue = temp;
			}
		}
	} catch (error) {
		Logger.LogWarning({
			controllerName: "useCommonSearchParams",
			actionName: "parse params",
			error: error,
		});
	}

	const setParams = useCallback(
		(key: T) => {
			try {
				searchParams.set(defaultParamsKey, encodeURIComponent(btoa(JSON.stringify(key))));
				setSearchParams(searchParams);
			} catch (error) {
				Logger.LogWarning({
					controllerName: "useCommonSearchParams",
					actionName: "setParams",
					error: error,
				});
			}
		},
		[searchParams]
	);

	return [paramsValue, setParams];
}
