import React, { useEffect } from "react";
import {
    Layout,
    Spin,
    Typography,
    theme,
    Button,
    Space,
    notification,
} from "antd";

import { matchPath, Outlet, useLocation } from "react-router-dom";
import BreadcrumbSub from "./components/breadcrumb-sub";
import LeftSidebar from "./components/left-sidebar";
import LeftHeader from "@project-self/layout/components/left-header";
import RightHeader from "@project-self/layout/components/right-header";
import { getMenus, getPermissions } from "@project-self/layout/rkt";
import {
    useAppDispatch,
    useAppSelector,
} from "@project-self/hooks/useAppDispatch";
import { IncreasesRender } from "@project-self/rtk/global-rtk";
import NoPermission from "@project-self/layout/components/no-permission";
import { useSelector } from "react-redux";
import { selectLayoutPermissions } from "@project-self/layout/selector";
import {
    AppRouteObject,
    PrivatePageRoutes,
} from "@project-self/routes/app-routes";
import { intersection } from "lodash";
import GlobalLoading from "@project-self/components/global-loading/global-loading";
import {
    selectGlobalFirstRender,
    selectGlobalLoading,
} from "@project-self/selector/selector";
import { nsLocalStorage } from "@project-self/utils/storgae";
import { CookieReadKey } from "@project-self/assets/consts";

const { Header, Content } = Layout;
const { useToken } = theme;

const determinePermission = (
    permissions: Nullable<number[]>,
    pathname: string
) => {
    let currentRoute: AppRouteObject | null = null;

    // 在有权限控制的 route 中找到当前页面使用的 route。
    PrivatePageRoutes.forEach((item) => {
        if (item.path) {
            const result = matchPath(item.path, pathname);
            if (result) {
                currentRoute = item;
            }
        }
    });
    if (currentRoute != null) {
        const permissions2 = (currentRoute as AppRouteObject).permission;
        return (
            intersection(permissions2, permissions).length ==
            permissions2.length
        );
    }
    return true;
};

const LayoutIndex = () => {
    const dispatch = useAppDispatch();
    const { token } = useToken();
    const location = useLocation();
    const permissions = useSelector(selectLayoutPermissions);
    const isLoading = useSelector(selectGlobalLoading);
    const canVisit = determinePermission(permissions, location.pathname);
    const isFirstRender = useAppSelector(selectGlobalFirstRender);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Space>
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        nsLocalStorage.set(CookieReadKey, "true");
                        api.destroy(key);
                    }}
                >
                    知道了
                </Button>
            </Space>
        );
        api.open({
            message: "分析代码",
            description:
                "本站使用了 google 和 百度统计 分析代码，用于追踪用户使用情况.",
            btn,
            key,
            duration: 10,
            placement: "bottomLeft",
            onClose: () => api.destroy(key),
        });
    };

    useEffect(() => {
        const initAllApi = async function () {
            await dispatch(getMenus());
            await dispatch(IncreasesRender());
            await dispatch(getPermissions());
            await dispatch(IncreasesRender());

            const isRead = nsLocalStorage.get(CookieReadKey);
            if (!isRead) {
                openNotification();
            }
        };
        initAllApi();
    }, []);

    return (
        <>
            {contextHolder}
            {isLoading && <GlobalLoading />}
            <Layout className="w-full h-full overflow-hidden flex">
                <Header
                    className="flex-none p-0 h-14 flex justify-between"
                    style={{
                        backgroundColor: token.colorPrimaryBorder,
                        height: "3.5rem",
                        padding: "0 1rem 0 0",
                    }}
                >
                    <LeftHeader />
                    <RightHeader />
                </Header>
                <Layout className="flex-auto flex">
                    <LeftSidebar />
                    <Layout className="flex-auto flex">
                        <div
                            className="flex-none h-12 flex items-center px-4"
                            style={{
                                backgroundColor: token.colorBgElevated,
                            }}
                        >
                            <BreadcrumbSub />
                        </div>
                        <Content
                            className={"flex-auto m-0 p-4"}
                            style={{ backgroundColor: token.colorBgLayout }}
                        >
                            {isFirstRender ? (
                                canVisit ? (
                                    <Outlet />
                                ) : (
                                    <NoPermission />
                                )
                            ) : (
                                <Spin
                                    className={"w-full h-full pt-32"}
                                    spinning={true}
                                    tip="加载中..."
                                />
                            )}
                        </Content>
                        <footer
                            className={
                                "flex-none flex h-12 justify-center items-center"
                            }
                            style={{ backgroundColor: token.colorBgElevated }}
                        >
                            Copyright © 2022-2023 &nbsp;
                            <Typography.Link
                                href="https://github.com/nextstarproject"
                                target="_blank"
                                rel={"nofollow noreferrer noopener"}
                            >
                                @NextStarProject
                            </Typography.Link>
                        </footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutIndex;

{
    /* <Content className="flex-auto overflow-auto scrollBar bg-white m-0 p-4">
    {isFirstRender ? (
        canVisit ? (
            <Outlet />
        ) : (
            <NoPermission />
        )
    ) : (
        <Spin
            className={'w-full h-full pt-32'}
            spinning={true}
            tip="加载中..."
        />
    )}
</Content> */
}
