import { isDev } from "@project-self/utils/env-detect";
import { Store } from "@reduxjs/toolkit";

/**
 * Dev tools in Console.
 * * 注意： 你的代码不应该依赖于 window._devHelper
 * @param store
 */
export function initDevHelper(store: Store, nspUtils: unknown): void {
	if (!isDev) {
		return;
	}
	window._devHelper = {
		//used as a manual flag for debug.
		debugFlag: false,
		nspUtils: nspUtils,
		get state() {
			return store.getState();
		},
	};
}
