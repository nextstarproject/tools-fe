import LayoutLeftSideBarTrigger from "@project-self/layouts/components/layout-left-sidebar-trigger";
import { Layout, Menu, Skeleton, theme } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState, selectLayoutState } from "@project-self/store/selector";
import { MenuItem } from "@project-self/assets/consts/menus";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link, matchPath, useLocation } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { Languages } from "nsp-i18n";
import { defaultLanguage } from "@project-self/utils/default-language";
import { DynamicAntIcon } from "@project-self/components/dynamic-icon/dynamic-icon";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";

/**
 * @description 将请求的Menus列表转换为Antd的菜单
 * @param menus
 * @returns
 */
const convertMenus = (menus: Nullable<MenuItem[]>, i18n: Languages): ItemType[] | undefined => {
	if (menus != null && menus.length > 0) {
		return menus.map((x) => {
			let labelName = x.name;
			const language = defaultLanguage();
			if (x.i18n != undefined) {
				if (import.meta.env.NSP_LANGUAGE == "true") {
					labelName = x.i18n[i18n];
				} else {
					labelName = x.i18n[language];
				}
			}
			let label: string | JSX.Element = labelName;
			if (x.path) {
				label = <Link to={x.path}>{labelName}</Link>;
			}
			if (x.externalUrl) {
				label = (
					<a href={x.externalUrl} title={labelName} target={"_blank"} rel={AHrefRelAllNo}>
						{labelName}
					</a>
				);
			}
			return {
				key: x.id,
				label: label,
				icon:
					x.icon == undefined ? <AntDesignOutlined /> : <DynamicAntIcon type={x.icon} />,
				children:
					x.children != null && x.children.length > 0
						? convertMenus(x.children, i18n)
						: undefined,
			};
		});
	}
	return undefined;
};

const getCurrentMenus = (pathname: string, menus: Nullable<MenuItem[]>): MenuItem[] => {
	let tempMenus: MenuItem[] = [];
	if (menus == null) return tempMenus;
	for (let i = 0; i < menus.length; i++) {
		if (menus[i].path != null) {
			const match = matchPath(menus[i].path as string, pathname);
			if (match != null) {
				tempMenus.push(menus[i]);
				continue;
			} else if (menus[i].children != null) {
				tempMenus.push(menus[i]);
				const temp = getCurrentMenus(pathname, menus[i].children as MenuItem[]);
				if (temp.length > 0) {
					tempMenus = tempMenus.concat(temp);
				} else {
					tempMenus = tempMenus.slice(0, tempMenus.length - 1);
				}
				continue;
			}
		} else if (menus[i].children != null) {
			tempMenus.push(menus[i]);
			const temp = getCurrentMenus(pathname, menus[i].children as MenuItem[]);
			if (temp.length > 0) {
				tempMenus = tempMenus.concat(temp);
			} else {
				tempMenus = tempMenus.slice(0, tempMenus.length - 1);
			}
			continue;
		}
	}
	return tempMenus;
};

const LayoutLeftSidebar = (props: { prepare: boolean }) => {
	const [collapsed, setCollapsed] = useState(false);
	const globalState = useAppSelector(selectGlobalState);
	const layoutState = useAppSelector(selectLayoutState);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectKeys, setSelectKeys] = useState<string[]>([]);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const location = useLocation();
	useEffect(() => {
		const currentMenus = getCurrentMenus(location.pathname, layoutState.menus);
		const keys = currentMenus.map((x) => x.id.toString());
		if (!collapsed) {
			if (keys.length > 1) {
				setOpenKeys(keys.slice(0, keys.length - 1));
			}
		}
		setSelectKeys(keys);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [layoutState.menus, location.pathname]);

	const renderMenus = useCallback(() => {
		return convertMenus(layoutState.menus, globalState.language);
	}, [layoutState.menus, globalState.language]);

	return (
		<Layout.Sider
			theme={globalState.theme.isDark ? "dark" : "light"}
			width={256}
			className={"h-full relative z-[100]"}
			style={{ backgroundColor: colorBgContainer }}
			trigger={
				<LayoutLeftSideBarTrigger
					isAbsolute={false}
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
			}
			collapsible
			collapsed={collapsed}
		>
			<div className={"h-full w-full overflow-x-hidden overflow-y-auto"}>
				{props.prepare && <Skeleton active={true} />}
				{!props.prepare && (
					<Menu
						mode={"inline"}
						selectedKeys={selectKeys}
						openKeys={openKeys}
						onOpenChange={(keys) => {
							setOpenKeys(keys);
						}}
						style={{ height: "100%", borderRight: 0 }}
						items={renderMenus()}
					/>
				)}
			</div>
		</Layout.Sider>
	);
};

export default LayoutLeftSidebar;
