import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const TestPage = React.lazy(() => import("./index"));

export const TestPageRouter: AppRouteObject = {
	title: "Route.UUID",
	path: "/test",
	element: <LazyImportComponent lazyChildren={TestPage} />,
	permission: [],
};
