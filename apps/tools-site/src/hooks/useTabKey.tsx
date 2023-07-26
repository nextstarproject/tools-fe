import { useCallback } from "react";
import useCommonSearchParams from "./useCommonSearchParams";

const TabSearchKeyDefault = "tab";

export type TabSearchParams = {
	tabKey: string;
};

export default function useTabKey(defaultTabKey: string): [string, (key: string) => void] {
	const [params, setParams] = useCommonSearchParams<TabSearchParams>(
		{
			tabKey: defaultTabKey,
		},
		TabSearchKeyDefault
	);

	const setTabKey = useCallback(
		(tabKey: string) => {
			setParams({
				tabKey: tabKey,
			});
		},
		[setParams]
	);

	return [params.tabKey, setTabKey];
}
