import { Button, Modal, Spin } from "antd";
import React, { Dispatch, ReactInstance, SetStateAction, useEffect, useRef, useState } from "react";
import ZiTieBg from "@project-self/assets/bg.svg";
import { useReactToPrint } from "react-to-print";
import styles from "./print-article-modal.module.scss";
import { textFormatted } from "../utils";
import { articleFormType } from "../types";
import classNames from "classnames";
import * as dayjs from "dayjs";

const PrintArticleModal = (props: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	articleContent: articleFormType;
}) => {
	const componentRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const beforePrintHandler = () => {
		setLoading(true);
	};

	const afterPrintHandler = () => {
		setLoading(false);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current as unknown as ReactInstance,
		copyStyles: true,
		documentTitle: "字帖打印",
		onBeforePrint: beforePrintHandler,
		onAfterPrint: afterPrintHandler,
		fonts: [
			{
				family: props.articleContent.fontFamily,
				source: `local(${props.articleContent.fontFamily})`,
			},
		],
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === "p") {
			event.preventDefault(); // 阻止默认的打印行为
			handlePrint();
		}
	};
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	const contentArr = textFormatted(props.articleContent.text, 15, 12);
	// 渲染段落和行
	const renderedSegments = (segments: string[][]) => {
		const count = segments.length;
		return segments.map((segment, index) => (
			<>
				<div className={styles.ziPage} key={"zi-page" + index}>
					{props.articleContent.pageHeader && (
						<span className={styles.printShow}>{props.articleContent.pageHeader}</span>
					)}
					<ul key={index} className={styles.ziUl}>
						{segment.map((line, lineIndex) => (
							<li
								className={classNames(
									styles.liNormal,
									props.articleContent.useBg ? styles.liNormalBg : ""
								)}
								key={lineIndex}
								style={{
									color: props.articleContent.color as string,
									fontFamily: props.articleContent.fontFamily,
								}}
							>
								{line === " " ? "\u00A0" : line}
							</li>
						))}
					</ul>
					{props.articleContent.usePageFooter && (
						<span className={styles.printShow}>
							{index + 1}/{count}
						</span>
					)}
				</div>
				{index == segments.length - 1 || (
					<div className={styles.afterPage} key={"after-page" + index}>
						<div className={styles.pageHeader} style={{ color: "rgb(102, 102, 102)" }}>
							{"  \u000C  "}
						</div>
					</div>
				)}
			</>
		));
	};
	return (
		<Modal
			title="字帖预览"
			centered
			open={props.open}
			onOk={handlePrint}
			onCancel={() => props.setOpen(false)}
			okText={"打印"}
			cancelText={"取消"}
			width={1000}
			destroyOnClose={true}
		>
			<Spin spinning={loading} tip={"正在打印中..."}>
				<div ref={componentRef} style={{ zoom: 1 }}>
					<div
						className={styles.pageHeader}
						style={{ color: "rgb(102, 102, 102)" }}
					></div>
					{renderedSegments(contentArr)}
				</div>
			</Spin>
		</Modal>
	);
};

export default PrintArticleModal;
