import { RouteObject } from "react-router-dom";
import SignInCallback from "@project-self/routes/sign-in-callback/sign-in-callback";

const SignInCallbackRoute: RouteObject = {
	path: "/signincallback",
	element: <SignInCallback />,
};

export default SignInCallbackRoute;
