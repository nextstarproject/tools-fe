import { Button, Checkbox, ColorPicker, Divider, Form, Input, Switch, Typography } from "antd";
import React, { useState } from "react";
import value from "../test.txt?raw";
import PrintArticleModal from "./print-article-modal";
import { articleFormType } from "../types";
import { Color } from "antd/es/color-picker";

import { AHrefRelAllNo, AHrefRelReferrer } from "@project-self/assets/consts/html-tag-consts";

const { Text, Paragraph, Link } = Typography;

const layout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
};
const tailLayout = {
	wrapperCol: { offset: 3, span: 21 },
};
const defaultArticleData: articleFormType = {
	fontFamily: `"方正行楷细 简", FZXingKaiXiS, FZKai-Z03S`,
	color: "#cccccc",
	text: value,
	useBg: true,
};
const ArticleTab = () => {
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm<articleFormType>();
	const [articleData, setArticleData] = useState<articleFormType>(defaultArticleData);
	const onFinish = (formData: articleFormType) => {
		if ((formData.color as Color).toHex) {
			formData.color = (formData.color as Color).toHexString();
		}
		console.log(formData);
		setArticleData(formData);
		setOpen(true);
	};
	return (
		<React.Fragment>
			<Typography>
				<Paragraph>
					本页面文章生成字帖，使用换行符进行换行分段，每一段都会自动进行首行缩进，尾部填充到末尾，默认最后一个页面补满空格。
					<br />
					输入文字并且选择好颜色后，点击生成字帖即可生成预览字体，此时点击打印或者使用
					<Text keyboard>Ctrl + P</Text>进行打印
					<br />
					本页面内容参考：
					<Link href="https://www.an2.net/" target={AHrefRelReferrer}>
						www.an2.net
					</Link>
					<br />
					字体可以在方正字库下载，个人使用免费，个别可以免费商用：
					<Link href="https://www.foundertype.com/" target={AHrefRelAllNo}>
						www.foundertype.com
					</Link>
				</Paragraph>
			</Typography>
			<Divider />
			<Form
				{...layout}
				form={form}
				name="control-hooks"
				style={{ maxWidth: 1000 }}
				onFinish={onFinish}
				initialValues={articleData}
			>
				<Form.Item
					name="fontFamily"
					label="字体"
					rules={[{ required: true, message: "请输入字体" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="color" label="颜色">
					<ColorPicker
						presets={[
							{
								label: "Recommended",
								colors: [
									"#888888",
									"#999999",
									"#a0a0a0",
									"#aaaaaa",
									"#b8b8b8",
									"#cccccc",
									"#ffffff",
								],
							},
						]}
					/>
				</Form.Item>
				<Form.Item name="useBg" label="背景" valuePropName="checked">
					<Checkbox>使用背景格子</Checkbox>
					{/* <Switch /> */}
				</Form.Item>
				<Form.Item
					name="text"
					label="内容"
					rules={[{ required: true, message: "请输入字帖内容" }]}
				>
					<Input.TextArea
						rows={8}
						showCount={{
							formatter: (info) => {
								if (info.count > 6000) {
									return <span className={"text-red-500"}>{info.count}</span>;
								} else {
									return <span className={"text-green-500"}>{info.count}</span>;
								}
							},
						}}
					/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						生成字帖
					</Button>
				</Form.Item>
			</Form>
			<PrintArticleModal
				key={"1"}
				open={open}
				setOpen={setOpen}
				articleContent={articleData}
			/>
		</React.Fragment>
	);
};

export default ArticleTab;
