import { LazyImportComponent } from "@project-self/components/lazy-import-component";
import { AppRouteObject } from "@project-self/routes/routes";
import React from "react";

const RsaGenerate = React.lazy(() => import("./rsa-generate"));

export const RsaGenerateRouter: AppRouteObject = {
	title: "Route.RsaGenerate",
	path: "/generate/rsa-generate",
	element: <LazyImportComponent lazyChildren={RsaGenerate} />,
	permission: [],
};

const RsaUse = React.lazy(() => import("./rsa-use"));

export const RsaUseRouter: AppRouteObject = {
	title: "Route.RsaUse",
	path: "/safety/rsa-use",
	element: <LazyImportComponent lazyChildren={RsaUse} />,
	permission: [],
};

export default [RsaGenerateRouter, RsaUseRouter];
