import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const MarkdownPage = React.lazy(() => import("./index"));

export const MarkdownPageRouter: AppRouteObject = {
	title: "Route.Markdown",
	path: "/unclassified/markdown",
	element: <LazyImportComponent lazyChildren={MarkdownPage} />,
	permission: [],
};
