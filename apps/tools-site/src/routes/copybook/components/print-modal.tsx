import { Button, Modal } from "antd";
import { Dispatch, ReactInstance, SetStateAction, useRef, useState } from "react";
import ZiTieBg from "@project-self/assets/bg.svg";
import { useReactToPrint } from "react-to-print";

const parserString = (str: string): string[] => {
	const strArr = str.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
	let newStrArr: string[] = [];
	for (let i = 0; i < strArr.length; i++) {
		const temp1 = [...strArr[i]];
		temp1.unshift("-", "-");
		const shengyu = temp1.length % 12;
		if (shengyu != 0) {
			for (let j = 0; j < 12 - shengyu; j++) {
				temp1.push("-");
			}
		}

		newStrArr = newStrArr.concat(temp1);
	}
	return newStrArr;
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
				source: props.fontFamily,
			},
		],
	});
	const contentArr = parserString(props.content);
	console.log(contentArr);
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
			<ul
				ref={componentRef}
				style={{
					padding: "0",
					width: "940px",
					margin: "10px auto",
					fontFamily: props.fontFamily,
				}}
			>
				{contentArr.map((x, index) => (
					<li
						key={index}
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
						{x}
					</li>
				))}
			</ul>
		</Modal>
	);
};

export default PrintModal;
