import { Button, Modal } from "antd";
import React, { Dispatch, ReactInstance, SetStateAction, useRef, useState } from "react";
import ZiTieBg from "@project-self/assets/bg.svg";
import { useReactToPrint } from "react-to-print";
import styles from "./print-modal.module.scss";

const paragraphFormatted = (paragraphs: string[], wordsPerLine: number) => {
	let newStrArr: string[] = [];
	for (let i = 0; i < paragraphs.length; i++) {
		const temp1 = [...paragraphs[i]];
		temp1.unshift(" ", " ");
		const excess = temp1.length % wordsPerLine;
		if (excess != 0) {
			for (let j = 0; j < wordsPerLine - excess; j++) {
				temp1.push(" ");
			}
		}

		newStrArr = newStrArr.concat(temp1);
	}
	return newStrArr;
};

/**
 *
 * @param text 文本
 * @param linesPerSegment 多少行分割
 * @param wordsPerLine 每行字数
 */
const textFormatted = (text: string, linesPerSegment: number, wordsPerLine: number): string[][] => {
	const paragraphList = text.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
	const textArr: string[] = paragraphFormatted(paragraphList, wordsPerLine);
	const segments: string[][] = [];
	const sum = linesPerSegment * wordsPerLine;
	for (let i = 0; i < textArr.length; i += sum) {
		const segmentLines = textArr.slice(i, i + sum);
		if (segmentLines.length < sum) {
			const excessCount = segmentLines.length;
			for (let j = 0; j < excessCount; j++) {
				segmentLines.push(" ");
			}
		}
		segments.push(segmentLines);
	}
	return segments;
};

const PrintModal = (props: {
	content: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	fontFamily: string;
}) => {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current as unknown as ReactInstance,
		copyStyles: true,
		documentTitle: "字帖打印",
		fonts: [
			{
				family: props.fontFamily,
				source: `local(props.fontFamily)`,
			},
		],
	});
	const contentArr = textFormatted(props.content, 15, 12);
	// 渲染段落和行
	const renderedSegments = (segments: string[][]) => {
		return segments.map((segment, index) => (
			<>
				<div className={styles.ziPage}>
					<ul key={index} className={styles.ziUl}>
						{segment.map((line, lineIndex) => (
							<li
								key={lineIndex}
								style={{
									display: "inline-block",
									backgroundImage: `url(${ZiTieBg})`,
									width: "80px",
									height: "80px",
									color: "rgb(184, 184, 184)",
									fontFamily: props.fontFamily,
									fontSize: "58px",
									textAlign: "center",
									lineHeight: "80px",
									margin: "5px 0px 5px -2px",
								}}
							>
								{line === " " ? "\u00A0" : line}
							</li>
						))}
					</ul>
				</div>
				{index == segments.length - 1 || (
					<div className={styles.afterPage}>
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
			title="Modal"
			centered
			open={props.open}
			onOk={handlePrint}
			onCancel={() => props.setOpen(false)}
			okText={"打印"}
			width={1000}
			destroyOnClose={true}
		>
			<div ref={componentRef}>
				<div className={styles.pageHeader} style={{ color: "rgb(102, 102, 102)" }}></div>
				{renderedSegments(contentArr)}
			</div>
		</Modal>
	);
};

export default PrintModal;
