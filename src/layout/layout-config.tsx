import React from "react";
import { ConfigProvider } from "antd";
import LayoutIndex from "./layout-index";
import zhCN from "antd/locale/zh_CN";
import { useAppSelector } from "@project-self/hooks/useAppDispatch";
import { selectGlobalThemeColor } from "@project-self/selector/selector";

const LayoutConfig = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <LayoutIndex />
        </ConfigProvider>
    );
};

export default LayoutConfig;
