import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";
import { LazyImportComponent } from "@project-self/components/lazy-import-component";

const OneWayEncryption = React.lazy(() => import("./index"));

const OneWayEncryptionRouter: AppRouteObject = {
	title: "Route.OneWayEncryption",
	path: "/safety/one-way-encryption",
	element: <LazyImportComponent lazyChildren={OneWayEncryption} />,
	permission: [],
};

export default OneWayEncryptionRouter;
