import { RouteObject } from "react-router-dom";
import SignOutCallback from "@project-self/routes/sign-out-callback/sign-out-callback";

const SignOutCallbackRoute: RouteObject = {
	path: "/signoutcallback",
	element: <SignOutCallback />,
};

export default SignOutCallbackRoute;
