import { AsyncStatus } from "@project-self/types/async-status";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logger from "@project-self/utils/logger";
import { CallbackComponent } from "redux-oidc";
import { redirectToLogin, userManager } from "@project-self/utils/auth/user-manager";
import GlobalLoading from "@project-self/components/global-loading/global-loading";
import { changeLoginStatus } from "@project-self/rtk/oidc";

const SignInCallback = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		// setLastRequestTime(new Date());
		dispatch(changeLoginStatus(AsyncStatus.Pending));
	}, [dispatch]);

	const successCallback = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(user: any) => {
			Logger.LogInformation({
				controllerName: "SignInCallback",
				actionName: "successCallback",
				error: user,
			});
			dispatch(changeLoginStatus(AsyncStatus.Fulfilled));
			navigate("/");
		},
		[dispatch, navigate]
	);

	const errorCallback = useCallback(
		(error: Error): void => {
			Logger.LogError({
				controllerName: "sign-in-callback",
				actionName: "callback",
				error: error,
			});

			//try to FIX: LEYSERNEXT-838
			//In some scene, users will save account url as a Bookmark. If the state param included in account url timeout. After login, will cause this type error.
			//So, Try to redirectToLogin again if no matching state error occured.
			if (error.message === "No matching state found in storage") {
				redirectToLogin();
			}
			dispatch(changeLoginStatus(AsyncStatus.Rejected));
			navigate("/");
		},
		[dispatch, navigate]
	);

	return (
		// @ts-expect-error This useManger is equal, but not known error
		<CallbackComponent
			userManager={userManager}
			successCallback={successCallback}
			errorCallback={errorCallback}
		>
			<GlobalLoading message={"正在登录中..."} />
		</CallbackComponent>
	);
};

export default SignInCallback;
