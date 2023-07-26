import { RouteObject } from "react-router-dom";
import NotFound from "@project-self/routes/not-found/not-found";

const NotFoundRoutes: RouteObject = {
	path: "*",
	element: <NotFound />,
};

export default NotFoundRoutes;
