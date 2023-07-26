import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, Skeleton, Space, notification, theme } from "antd";
import LayoutHeaderLeft from "@project-self/layouts/components/layout-header-left";
import LayoutHeaderRight from "@project-self/layouts/components/layout-header-right";
import LayoutLeftSidebar from "@project-self/layouts/components/layout-left-sidebar";
import LayoutSettingDrawer from "@project-self/layouts/components/layout-setting-drawer";
import LayoutBreadcrumb from "./components/layout-breadcrumb";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";
import LayoutApplicationDrawer from "./components/layout-application-drawer";
import { useTranslation } from "nsp-i18n";
import { useBoolean } from "ahooks";
import GlobalLoading from "@project-self/components/global-loading/global-loading";
import LayoutFooter from "./components/layout-footer";
import { nsLocalStorage } from "@project-self/utils/storage";

export interface INotificationProps {
	title: string;
	description: string | JSX.Element;
	cancelText?: string | undefined;
	okText?: string | undefined;
	cancelHandle?: (() => void) | undefined;
	okHandle?: (() => void) | undefined;
	duration: Nullable<number>;
}

const LayoutMain = () => {
	const { t } = useTranslation();
	const globalState = useAppSelector(selectGlobalState);
	const [prepare, setPrepare] = useBoolean(true);
	const [notificationApi, notificationContextHolder] = notification.useNotification();
	const {
		token: { colorBgContainer, colorBgLayout, colorBorder },
	} = theme.useToken();

	// 打开系统提示通知
	const openSystemTipsNotification = useCallback(
		(data: INotificationProps) => {
			const key = `layout common notification ${Date.now()}`;
			const btn = (
				<Space>
					<Button
						size="small"
						onClick={() => {
							if (data.cancelHandle != undefined) {
								data.cancelHandle();
							}
							notificationApi.destroy(key);
						}}
					>
						{data.cancelText ?? t("COMMON.Cancel")}
					</Button>
					<Button
						type="primary"
						size="small"
						onClick={() => {
							if (data.okHandle != undefined) {
								data.okHandle();
							}
							notificationApi.destroy(key);
						}}
					>
						{data.okText ?? t("COMMON.Ok")}
					</Button>
				</Space>
			);
			notificationApi.info({
				message: data.title,
				description: data.description,
				btn,
				key,
				duration: data.duration,
				placement: "bottomRight",
				closeIcon: false,
			});
		},
		[notificationApi, t]
	);
	const cookieTips = useCallback(() => {
		const isAccept = nsLocalStorage.get("site.cookie");
		if (isAccept != "true") {
			openSystemTipsNotification({
				title: t("Site.CookieTitle"),
				description: t("Site.CookieDescription"),
				cancelText: t("Site.CookieNextTime"),
				okText: t("Site.CookieAccept"),
				duration: null,
				okHandle: () => {
					nsLocalStorage.set("site.cookie", "true");
				},
			});
		}
	}, [openSystemTipsNotification, t]);

	useEffect(() => {
		document.title = t("COMMON.SITE_NAME");
	}, [globalState.language, t]);

	useEffect(() => {
		const init = async () => {
			await setTimeout(() => {
				setPrepare.setFalse();
				cookieTips();
			}, 300);
		};
		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout
			className={`h-full w-full ${globalState.theme.isDark ? "nsp-dark" : ""}`}
			style={{ minWidth: "1280px" }}
		>
			<Layout.Header
				className={"flex flex-row items-center px-4"}
				style={{
					backgroundColor: colorBgContainer,
					borderBottom: `1px solid ${colorBorder}`,
				}}
			>
				{/* header */}
				<LayoutHeaderLeft />
				<LayoutHeaderRight />
			</Layout.Header>
			<Layout>
				{/* left sidebar */}
				<LayoutLeftSidebar prepare={prepare} />
				<Layout.Content
					className={
						"flex flex-col h-full overflow-auto relative [&>section]:overflow-auto [&>section]:flex-1 [&>section]:px-4 [&>section]:py-2"
					}
					style={{ backgroundColor: colorBgLayout }}
				>
					{prepare && <Skeleton active={true} />}
					{!prepare && <LayoutBreadcrumb />}
					{!prepare && <Outlet />}
					{!prepare && <LayoutFooter />}
				</Layout.Content>
			</Layout>
			<React.Fragment>
				{/* 所有layout可能都调用的组件放在此处，通过rtk调用 */}
				{import.meta.env.NSP_THEME_CONFIG == "true" && <LayoutSettingDrawer />}
				<LayoutApplicationDrawer />
				{prepare && <GlobalLoading />}
				{notificationContextHolder}
			</React.Fragment>
		</Layout>
	);
};

export default LayoutMain;
