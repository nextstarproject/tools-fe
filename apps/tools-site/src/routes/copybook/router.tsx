import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const CopyBookPage = React.lazy(() => import("./index"));

export const CopyBookPageRouter: AppRouteObject = {
	title: "Route.CopyBook",
	path: "/unclassified/copybook",
	element: <LazyImportComponent lazyChildren={CopyBookPage} />,
	permission: [],
};
