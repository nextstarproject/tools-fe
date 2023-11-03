import {
	Alert,
	Button,
	Checkbox,
	ColorPicker,
	Divider,
	Form,
	Input,
	InputNumber,
	Space,
	Tooltip,
	Typography,
	Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import singleSample from "../single-sample.txt?raw";
import { singleFormType } from "../types";
import { Color } from "antd/es/color-picker";
import { AHrefRelAllNo, AHrefRelReferrer } from "@project-self/assets/consts/html-tag-consts";
import { useTranslation } from "nsp-i18n";
import { QuestionCircleOutlined } from "@ant-design/icons";
import PrintSingleModal from "./print-single-modal";
import dayjs from "dayjs";
import { textSingleReplace } from "../utils";

const { Text, Paragraph, Link } = Typography;

const layout = {
	labelCol: { span: 3 },
	wrapperCol: { span: 21 },
};
const tailLayout = {
	wrapperCol: { offset: 3, span: 21 },
};
const defaultArticleData: singleFormType = {
	pageHeader: "字帖打印: https://tools.nextstar.space/unclassified/copybook",
	fontFamily: `"方正行楷细 简", FZXingKaiXiS, FZKai-Z03S`,
	color: "#cccccc",
	text: singleSample,
	useBg: true,
	usePageFooter: true,
	repeatLine: 1,
};
const SingleTab = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [nums, setNums] = useState<{ line: number; textLength: number; sum: number }>({
		line: 0,
		textLength: 0,
		sum: 0,
	});
	const [form] = Form.useForm<singleFormType>();
	const [articleData, setArticleData] = useState<singleFormType>(defaultArticleData);
	const onFinish = (formData: singleFormType) => {
		if ((formData.color as Color).toHex) {
			formData.color = (formData.color as Color).toHexString();
		}
		setArticleData(formData);
		setOpen(true);
	};
	const fieldsChangeHandler = () => {
		console.log("fieldsChangeHandler");
		setNums({
			line: form.getFieldValue("repeatLine") ?? 0,
			textLength: textSingleReplace(form.getFieldValue("text")).length ?? 0,
			sum:
				(form.getFieldValue("repeatLine") ?? 0) *
				(form.getFieldValue("text")?.length ?? 0) *
				12,
		});
	};
	useEffect(() => {
		fieldsChangeHandler();
	}, []);
	return (
		<React.Fragment>
			<Typography>
				<Paragraph>
					<Alert message={t("CopyBookPage.ChineseTips")} type="warning" />
					本页面单行单字生成字帖，会将其中换行符、空格、<Text code>，</Text>、
					<Text code>。</Text>全部删除掉，只保留纯内容。
					<br />
					输入文字并且选择好颜色后，点击生成字帖即可生成预览字体，此时点击打印或者使用
					<Text keyboard>Ctrl + P</Text>进行打印
					<br />
					<Alert
						message={
							<>
								重复行数
								<Text code>{nums.line}</Text>和文字长度
								<Text code>{nums.textLength}</Text>
								相乘计算后再乘以单行字数<Text code>12</Text>
								，结果&nbsp;
								{nums.sum > 6000 ? (
									<Tag color="#f50">{nums.sum}</Tag>
								) : (
									<Tag color="#87d068">{nums.sum}</Tag>
								)}
								尽量不要过大，否则Modal渲染时出现卡顿
							</>
						}
						type="error"
					/>
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
				onValuesChange={fieldsChangeHandler}
				name="copybook-single-tab"
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
				<Form.Item
					name="repeatLine"
					label={
						<Space>
							<span>重复行数</span>
							<Tooltip placement="top" title={"可设置1-15，单页上限为15行"}>
								<QuestionCircleOutlined />
							</Tooltip>
						</Space>
					}
					rules={[{ required: true, message: "请选择重复行数" }]}
				>
					<InputNumber min={1} max={15} />
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
					<Button type="primary" htmlType="submit">
						生成字帖
					</Button>
				</Form.Item>
			</Form>
			{open && (
				<PrintSingleModal
					key={dayjs(new Date()).toString()}
					open={open}
					setOpen={setOpen}
					articleContent={articleData}
				/>
			)}
		</React.Fragment>
	);
};

export default SingleTab;
