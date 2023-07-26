import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";
import { LazyImportComponent } from "@project-self/components/lazy-import-component";

const RandomString = React.lazy(() => import("./index"));

const RandomStringRouter: AppRouteObject = {
	title: "Route.RandomString",
	path: "/generate/random-string",
	element: <LazyImportComponent lazyChildren={RandomString} />,
	permission: [],
};

export default RandomStringRouter;
