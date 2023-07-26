import React, { CSSProperties } from "react";
import styles from "@project-self/components/global-loading/global-loading.module.scss";
import { Spin, theme } from "antd";
import { useTranslation } from "nsp-i18n";

export interface IGlobalLoadingProps {
	message?: string;
	style?: CSSProperties;
}

const GlobalLoading = (props: IGlobalLoadingProps) => {
	const { t } = useTranslation();
	const {
		token: { colorPrimary },
	} = theme.useToken();

	return (
		<div className={styles.loadingWrapper} style={props.style}>
			<div className={styles.loadingContainer}>
				<Spin spinning={true} />
				<br />
				<span className={styles.text} style={{ color: colorPrimary }}>
					{props.message ??
						(import.meta.env.NSP_LANGUAGE == "true"
							? t("COMMON.LOADING_TEXT")
							: "正在加载中...")}
				</span>
			</div>
		</div>
	);
};

export default GlobalLoading;
