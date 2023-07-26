import { AppRouteObject } from "@project-self/routes/routes";
import { Navigate } from "react-router-dom";

const LayoutIndexRouter: AppRouteObject = {
	index: true,
	element: <Navigate replace to={"/dashboard"} />,
};

export default LayoutIndexRouter;
