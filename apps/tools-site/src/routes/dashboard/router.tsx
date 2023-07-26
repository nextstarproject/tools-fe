import { AppRouteObject } from "@project-self/routes/routes";
import Dashboard from "@project-self/routes/dashboard/dashboard";

const DashboardRouter: AppRouteObject = {
	title: "Route.Dashboard",
	path: "/dashboard",
	element: <Dashboard />,
	permission: [],
};

export default DashboardRouter;
