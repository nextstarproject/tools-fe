/**
 * This file includes utils for env/runtime detect
 * suchs as browser version, platform. host..
 */

import { trim } from "lodash";

export const isDev: boolean = import.meta.env.DEV;

/**
 * If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory.
 * eg: iis vd path.
 * @returns
 */
export const getRelativeBasePath = (): string => {
	return trim(import.meta.env.BASE_URL || "", "/");
};

export const getHostPath = (): string => {
	let iisVDPath = getRelativeBasePath();
	if (iisVDPath) {
		iisVDPath = `/${iisVDPath}`;
	}
	return `${window.location.protocol}//${window.location.hostname}${
		window.location.port ? `:${window.location.port}` : ""
	}${iisVDPath}`;
};
