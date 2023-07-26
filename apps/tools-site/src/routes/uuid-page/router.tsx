import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const UuidPage = React.lazy(() => import("./index"));

export const UuidPageRouter: AppRouteObject = {
	title: "Route.UUID",
	path: "/generate/uuid",
	element: <LazyImportComponent lazyChildren={UuidPage} />,
	permission: [],
};
