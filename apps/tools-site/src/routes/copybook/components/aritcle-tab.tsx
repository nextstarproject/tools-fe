import {
	Alert,
	Button,
	Checkbox,
	ColorPicker,
	Divider,
	Form,
	Input,
	Space,
	Tooltip,
	Typography,
} from "antd";
import React, { useState } from "react";
import articleSample from "../article-sample.txt?raw";
import PrintArticleModal from "./print-article-modal";
import { articleFormType } from "../types";
import { Color } from "antd/es/color-picker";
import { AHrefRelAllNo, AHrefRelReferrer } from "@project-self/assets/consts/html-tag-consts";
import { useTranslation } from "nsp-i18n";
import { QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Paragraph, Link } = Typography;

const layout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
};
const tailLayout = {
	wrapperCol: { offset: 3, span: 21 },
};
const defaultArticleData: articleFormType = {
	pageHeader: "字帖打印: https://tools.nextstar.space/unclassified/copybook",
	fontFamily: `"方正行楷细 简", FZXingKaiXiS, FZKai-Z03S`,
	color: "#cccccc",
	text: articleSample,
	useBg: true,
	usePageFooter: true,
};
const ArticleTab = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [destroy, setDestroy] = useState(false);
	const [form] = Form.useForm<articleFormType>();
	const [articleData, setArticleData] = useState<articleFormType>(defaultArticleData);
	const onFinish = (formData: articleFormType) => {
		if ((formData.color as Color).toHex) {
			formData.color = (formData.color as Color).toHexString();
		}
		setArticleData(formData);
		setOpen(true);
	};
	return (
		<React.Fragment>
			<Typography>
				<Paragraph>
					<Alert message={t("CopyBookPage.ChineseTips")} type="warning" />
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
				name="copybook-article-tab"
				style={{ maxWidth: 1000 }}
				onFinish={onFinish}
				initialValues={articleData}
			>
				<Form.Item
					name="pageHeader"
					label={
						<Space>
							<span>页头</span>
							<Tooltip placement="top" title={"请保持版权所有，不会影响字帖使用"}>
								<QuestionCircleOutlined />
							</Tooltip>
						</Space>
					}
				>
					<Input allowClear />
				</Form.Item>
				<Form.Item
					name="fontFamily"
					label={
						<Space>
							<span>字体</span>
							<Tooltip placement="top" title={"可以使用系统字体"}>
								<QuestionCircleOutlined />
							</Tooltip>
						</Space>
					}
					rules={[{ required: true, message: "请输入字体" }]}
				>
					<Input allowClear />
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
				<Form.Item name="usePageFooter" label="页脚" valuePropName="checked">
					<Checkbox>使用页码</Checkbox>
					{/* <Switch /> */}
				</Form.Item>
				<Form.Item
					name="text"
					label="内容"
					rules={[{ required: true, message: "请输入字帖内容" }]}
				>
					<Input.TextArea
						className={"scroll-common"}
						allowClear
						rows={16}
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
					<Button type="primary" htmlType="submit" data-umami-event="single-copybook">
						生成字帖
					</Button>
				</Form.Item>
			</Form>
			{open && (
				<PrintArticleModal
					key={dayjs(new Date()).toString()}
					open={open}
					setOpen={setOpen}
					articleContent={articleData}
				/>
			)}
		</React.Fragment>
	);
};

export default ArticleTab;
