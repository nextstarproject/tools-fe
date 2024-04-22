import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const CompareContentLazy = React.lazy(() => import("./index"));

export const CompareContentRouter: AppRouteObject = {
	title: "Route.CompareContent",
	path: "/dt/compare-content",
	element: <LazyImportComponent lazyChildren={CompareContentLazy} />,
	permission: [],
};
