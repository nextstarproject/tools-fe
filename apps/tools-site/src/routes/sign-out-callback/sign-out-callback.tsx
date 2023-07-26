import { useCallback, useEffect } from "react";
import { SignoutCallbackComponent } from "redux-oidc";
import { useDispatch } from "react-redux";
import { AsyncStatus } from "@project-self/types/async-status";
import { useNavigate } from "react-router-dom";
import Logger from "@project-self/utils/logger";
import { redirectToLogin, userManager } from "@project-self/utils/auth/user-manager";
import GlobalLoading from "@project-self/components/global-loading/global-loading";
import { changeLogoutStatus } from "@project-self/rtk/oidc";

const SignOutCallback = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeLogoutStatus(AsyncStatus.Pending));
	}, [dispatch]);

	const successCallback = useCallback(() => {
		dispatch(changeLogoutStatus(AsyncStatus.Fulfilled));
		//redirect to login page.
		redirectToLogin();
	}, [dispatch]);

	const errorCallback = useCallback(
		(error: Error): void => {
			Logger.LogError({
				controllerName: "sign-out-callback",
				actionName: "callback",
				error: error,
			});
			dispatch(changeLogoutStatus(AsyncStatus.Rejected));
			navigate("/");
		},
		[dispatch, navigate]
	);

	return (
		// @ts-expect-error This useManger is equal, but not known error
		<SignoutCallbackComponent
			userManager={userManager}
			successCallback={successCallback}
			errorCallback={errorCallback}
		>
			<GlobalLoading message={"正在退出中..."} />
		</SignoutCallbackComponent>
	);
};

export default SignOutCallback;
