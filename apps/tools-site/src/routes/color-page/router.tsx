import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const ColorPage = React.lazy(() => import("./index"));

export const ColorPageRouter: AppRouteObject = {
	title: "Route.Color",
	path: "/unclassified/color",
	element: <LazyImportComponent lazyChildren={ColorPage} />,
	permission: [],
};
