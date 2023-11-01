import { Modal } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

const parserString = (str: string): string[] => {
	const strArr = str.replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n");
	const newStrArr = [];
	for (let i = 0; i < strArr.length; i++) {
		const temp1 = [...strArr[i]];
		temp1.unshift(" ", " ");
		const shengyu = temp1.length % 12;
		for (let j = 0; j < shengyu; j++) {
			temp1.push(" ");
		}
		newStrArr.push(temp1.join(""));
	}
	return newStrArr;
};

const PrintModal = (props: {
	content: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const contentArr = parserString(props.content);
	console.log(contentArr);
	return (
		<Modal
			title="Modal"
			centered
			open={props.open}
			onOk={() => props.setOpen(false)}
			onCancel={() => props.setOpen(false)}
			width={1000}
			destroyOnClose={true}
		>
			<p>{props.content}</p>
		</Modal>
	);
};

export default PrintModal;
