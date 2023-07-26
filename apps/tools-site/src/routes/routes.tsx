import LayoutMainWrapper from "@project-self/layouts/layout-main-wrapper";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";
import LayoutIndexRouter from "@project-self/routes/layout-index-router";
import SignInCallbackRoute from "@project-self/routes/sign-in-callback/router";
import SignOutCallbackRoute from "@project-self/routes/sign-out-callback/router";
import useLoginCheck from "@project-self/utils/auth/use-login-check";
import { useEffect } from "react";
import NotFoundRoutes from "@project-self/routes/not-found/router";
import DashboardRouter from "./dashboard/router";
import ContributorsRouter from "./contributors/router";
import OneWayEncryptionRouter from "./one-way-encryption/router";
import HmacRouter from "./hmac/router";
import RsaRouter from "./rsa/router";
import RandomStringRouter from "./random-string/router";
import { UuidPageRouter } from "./uuid-page/router";
import { ColorPageRouter } from "./color-page/router";

export type AppRouteObject = RouteObject & {
	/**
	 * @description 子路由
	 */
	children?: AppRouteObject[];
	/**
	 * @description 默认页面标题 i18n key
	 */
	title?: string;
	/**
	 * @description 只有在启用 `NSP_LOGIN_STATUS` 为 `true` 时才会使用
	 * 只有权限中任何一个才可以访问
	 */
	permission?: number[];
	/**
	 * @description 只有在启用 `NSP_LOGIN_STATUS` 为 `true` 时才会使用
	 * 是否登录，默认没有登录可以访问
	 */
	hasLogin?: boolean;
};

export type DataRoute2Object = RouteObject & {
	children?: DataRoute2Object[];
	id: string;
};

/**
 * !please append your page routes here
 *
 * if the page accessibility controlled by the server(same as left side menu), please add it in the
 * withPermissionPageRoutes array.
 * or please add it in the
 * withoutPermissionPageRoutes.
 * thank you.
 *
 */
const withPermissionPageRoutes: AppRouteObject[] = [
	OneWayEncryptionRouter,
	HmacRouter,
	...RsaRouter,
	RandomStringRouter,
	ContributorsRouter,
	UuidPageRouter,
	ColorPageRouter,
];

/**
 * @description 不需要权限ID的一些页面，比如dashboard，登录人员都可以访问，和public很相似
 * */
export const withoutPermissionPageRoutes: AppRouteObject[] = [DashboardRouter];

/**
 * @description 私有路由
 */
export const PrivatePageRoutes = withPermissionPageRoutes.concat(withoutPermissionPageRoutes);

/**
 * @description 基于layout中的路由
 * */
export const layoutRoutes: AppRouteObject[] = [
	LayoutIndexRouter,
	...PrivatePageRoutes,
	NotFoundRoutes,
];

const PublicWithoutLayoutRoutes: RouteObject[] = [];
//

/* ! DON'T APPEND ROUTES CONFIG HERE, PLEASE MODIFY PublicRoutes or PrivatePageRoutes */
/**
 * if logged in, use the PrivatePageRoutes routes.
 * if not log in, use the PublicRoutes routes.
 * when you in some page, and refresh the page,
 * the variable isLoggedIn do not determine, so it's false.
 * but the PublicRoutes do not have some routes, eg: /school
 * so after refresh the page, there is a while the routes do not have route defined /school,
 * the page will show 404. but the page actually has.
 *
 * if you use PrivatePageRoutes and isLoggedIn is false.
 * the pages in PrivatePageRoutes will fetch data from server.
 * because isLoggedIn is false, so in some situation it will redirect to login page, but it does not need.
 * transformRouteToPending will transform all routes with the defined path(route), but with <Pending /> element.
 * so there ara all routes here, and shows a loading page instead of fetching data from server.
 */
const getAppRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }): RouteObject[] => {
	let routes: AppRouteObject[] = [];
	if (isLoggedIn) {
		routes = [
			{
				path: "/",
				element: <LayoutMainWrapper />,
				permission: [],
				children: layoutRoutes,
			},
		];
	}
	routes = PublicWithoutLayoutRoutes.concat(routes);

	if (import.meta.env.NSP_LOGIN_STATUS == "true") {
		// login 放置在最前方
		routes.splice(0, 0, SignInCallbackRoute);
		routes.splice(0, 0, SignOutCallbackRoute);
	}

	return routes;
};

const RootRoutes = () => {
	const location = useLocation();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const isLoggedIn = import.meta.env.NSP_LOGIN_STATUS == "true" ? useLoginCheck() : true;

	useEffect(() => {
		// Google Analytics
		if (import.meta.env.NSP_GOOGLE_TAG == "true" && window._GOOGLE_TAG_ != "") {
			if (window._googleTag != undefined) {
				window._googleTag("event", "page_path_change", {
					path: location.pathname,
				});
			}
		}
	}, [location]);
	return useRoutes(getAppRoutes({ isLoggedIn: isLoggedIn }));
};

export default RootRoutes;
