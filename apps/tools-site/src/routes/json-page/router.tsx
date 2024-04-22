import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const JsonPageLazy = React.lazy(() => import("./index"));

export const JsonPageRouter: AppRouteObject = {
	title: "Route.JsonFormat",
	path: "/dt/json-format",
	element: <LazyImportComponent lazyChildren={JsonPageLazy} />,
	permission: [],
};
