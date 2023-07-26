import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const Contributors = React.lazy(() => import("./index"));

const ContributorsRouter: AppRouteObject = {
	title: "Route.Contributors",
	path: "/about/contributors",
	element: <LazyImportComponent lazyChildren={Contributors} />,
	permission: [],
};

export default ContributorsRouter;
