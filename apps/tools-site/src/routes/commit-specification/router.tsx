import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const CommitSpecification = React.lazy(() => import("./index"));

export const CommitSpecificationRouter: AppRouteObject = {
	title: "Route.CommitSpecification",
	path: "/unclassified/commit-specification",
	element: <LazyImportComponent lazyChildren={CommitSpecification} />,
	permission: [],
};
