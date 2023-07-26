import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "@project-self/rtk/oidc";
import { AsyncStatus } from "@project-self/types/async-status";
import { saveToken } from "@project-self/utils/auth/access-token";
import { loadOidcUser, redirectToLogin } from "@project-self/utils/auth/user-manager";
import { store } from "@project-self/store/store";
import { selectAuthState, selectOidc } from "@project-self/store/selector";
/**
 * check login status.
 * call loadOidcUser. 如果 user 为 true，则发送 dispatch 后返回。
 * 如果 user 为空，并且此时不是处于登录/登出重定向的过程中，则说明用户没有登录或登录过期，
 * 调用 redirectToLogin 去认证服务器刷新认证状态。
 * @returns {boolean} isLoggedIn
 */
const useLoginCheck = (): boolean => {
	const authState = useSelector(selectAuthState);
	const oidcState = useSelector(selectOidc);
	const dispatch = useDispatch();

	//use ref to let pre loadOidcUserCallback func instance get nearest render's oidcExtend's value.
	const authStateRef = useRef(authState);

	const isLoggedIn = authState.loginStatus === AsyncStatus.Fulfilled;

	const accessToken = useMemo(() => {
		return oidcState.user?.access_token;
	}, [oidcState.user?.access_token]);

	useEffect(() => {
		authStateRef.current = authState;
	}, [authState]);

	const loadOidcUserCallback = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async (user: any) => {
			//登录中或者登出中状态 不进行后续流程
			if (
				authStateRef.current.loginStatus === AsyncStatus.Pending ||
				authStateRef.current.logoutStatus === AsyncStatus.Pending
			) {
				return;
			}

			if (user && !user.expired) {
				dispatch(changeLoginStatus(AsyncStatus.Fulfilled));
				return;
			} else {
				dispatch(changeLoginStatus(AsyncStatus.None));
			}

			if (
				authStateRef.current.loginStatus === AsyncStatus.None ||
				authStateRef.current.loginStatus === AsyncStatus.Rejected
			) {
				redirectToLogin();
			}
		},
		[dispatch]
	);

	useEffect(() => {
		//首次进入页面的时候监测登录态
		loadOidcUser(store).then(loadOidcUserCallback);
	}, [loadOidcUserCallback]);

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			saveToken(accessToken);
		}
	}, [isLoggedIn, accessToken]);

	return isLoggedIn;
};

export default useLoginCheck;
