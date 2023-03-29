import React from "react";
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@project-self/layout/rkt";
import { useAppSelector } from "@project-self/hooks/useAppDispatch";
import { selectLayoutMenuStatus } from "@project-self/layout/selector";
import { ReactComponent as NextStarLogo } from "../../assets/nextstar_logo.svg";
import styles from "../styles/left-header.module.scss";
import { useNavigate } from "react-router-dom";

const LeftHeader = () => {
    const dispatch = useDispatch();
    const menuStatus = useAppSelector(selectLayoutMenuStatus);
    const navigate = useNavigate();
    return (
        <Space className={"ml-4"} size={"large"}>
            <Button icon={<AppstoreOutlined />} />
            <span
                className={styles.logoWrapper}
                onClick={() => {
                    navigate("/");
                }}
            >
                <NextStarLogo />
            </span>
            <Button
                icon={
                    menuStatus ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
                onClick={() => {
                    dispatch(toggleLoading());
                }}
            />
        </Space>
    );
};

export default LeftHeader;
