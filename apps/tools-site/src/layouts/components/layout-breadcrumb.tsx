import { HomeOutlined } from "@ant-design/icons";
import { PrivatePageRoutes } from "@project-self/routes/routes";
import { selectGlobalState, selectLayoutState } from "@project-self/store/selector";
import { useAppSelector } from "@project-self/store/store";
import { Breadcrumb, theme } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import _ from "lodash";
import { useTranslation } from "nsp-i18n";
import { useEffect, useState } from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";

const LayoutBreadcrumb = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const layoutState = useAppSelector(selectLayoutState);
	const globalState = useAppSelector(selectGlobalState);
	const {
		token: { colorPrimaryBg, colorText },
	} = theme.useToken();
	const [breadcrumbItems, setBreadcrumbItems] = useState<ItemType[]>([]);

	useEffect(() => {
		const routes = matchRoutes(PrivatePageRoutes, location)?.map((x) => x);
		let tmpBreadcrumbItems: ItemType[] = [
			{
				className: "inline-block h-full",
				title: (
					<Link className="!h-full" to="/">
						<HomeOutlined />
						&nbsp; Home
					</Link>
				),
				key: "Home",
			},
		];
		if (routes != undefined) {
			const routeLinks: ItemType[] = _.map(routes, (x) => {
				return {
					className: "inline-block h-full",
					title: (
						<Link className="!h-full" to={x.pathname}>
							{t(x.route.title ?? "")}
						</Link>
					),
					key: x.pathname,
				};
			});
			tmpBreadcrumbItems = tmpBreadcrumbItems.concat(routeLinks);
		}
		if (layoutState.breadcrumb != undefined) {
			const replace = layoutState.breadcrumb.replace ?? false;
			const title = layoutState.breadcrumb.title ?? "";
			const url = layoutState.breadcrumb.url;
			if (title != "") {
				if (replace) {
					tmpBreadcrumbItems = _.slice(
						tmpBreadcrumbItems,
						0,
						tmpBreadcrumbItems.length - 1
					);
				}

				if (url) {
					tmpBreadcrumbItems.push({
						className: "inline-block h-full",
						title: (
							<Link className="!h-full" to={url}>
								title
							</Link>
						),
						key: title + url,
					});
				} else {
					tmpBreadcrumbItems.push({
						className: "inline-block h-full",
						title: title,
						key: title,
					});
				}
			}
		}
		setBreadcrumbItems(tmpBreadcrumbItems);
	}, [location, layoutState.breadcrumb, globalState.language, t]);

	return (
		<Breadcrumb
			className={"h-10 px-4 leading-10 shadow"}
			style={{
				backgroundColor: colorPrimaryBg,
				color: colorText,
			}}
			items={breadcrumbItems}
		/>
	);
};

export default LayoutBreadcrumb;
