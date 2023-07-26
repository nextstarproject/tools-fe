import { User, WebStorageStateStore } from "oidc-client";
import { createUserManager, loadUser } from "redux-oidc";
import { getHostPath } from "@project-self/utils/env-detect";
import { EnhancedStore } from "@reduxjs/toolkit";
import { debounce, once } from "lodash";
import { removeToken } from "@project-self/utils/auth/access-token";
import Logger from "@project-self/utils/logger";
import { ProjectName } from "@project-self/assets/consts/global-consts";

const config = {
	authority: window._AUTHORITY_ENDPOINT_,
	client_id: "62b28d52b20f8cf0cd195f71",
	redirect_uri: getHostPath() + "/signincallback",
	response_type: "code",
	scope: "openid profile",
	post_logout_redirect_uri: getHostPath() + "/signoutcallback",
	loadUserInfo: true,
};

const userManager = createUserManager({
	...config,
	userStore: new WebStorageStateStore({
		store: window.localStorage,
		prefix: `${ProjectName}.`,
	}),
});

export { userManager };

/**
 * @description Loads potentially existing user data into the redux store, thus eliminating a new authentication roundtrip to the authentication server when a tab is closed or a new tab is opened.
 * @param store
 * @link https://github.com/maxmantz/redux-oidc/blob/master/docs/API.md#loaduser
 */
export const loadOidcUser = (store: EnhancedStore): Promise<User> => {
	return loadUser(store, userManager);
};

/***
 * @description 重定向至登录页面
 */
export const redirectToLogin = debounce(() => {
	Logger.LogInformation({ controllerName: "oidc", actionName: "redirectToLogin" });
	userManager.signinRedirect();
}, 3000);

/***
 * @description 退出登录
 */
export const redirectToLogout = once(async () => {
	Logger.LogInformation({ controllerName: "oidc", actionName: "redirectToLogout" });
	await userManager.clearStaleState();
	removeToken();
	await userManager.signoutRedirect();
});
