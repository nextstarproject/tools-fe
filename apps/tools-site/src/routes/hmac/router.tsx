import React from "react";
import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "../routes";

const Hmac = React.lazy(() => import("./index"));

const HmacRouter: AppRouteObject = {
	title: "Route.Hmac",
	path: "/safety/hmac",
	element: <LazyImportComponent lazyChildren={Hmac} />,
	permission: [],
};

export default HmacRouter;
