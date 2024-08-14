import { CloseCircleOutlined, CopyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
	ModalForm,
	pickControlProps,
	ProForm,
	ProFormGroup,
	ProFormItem,
	ProFormItemRender,
	ProFormList,
	ProFormText,
	ProFormTextArea,
} from "@ant-design/pro-components";
import { AutoComplete, Form, Input, message, Space, Tooltip } from "antd";
import { fileExtensions, SpecificationFormType, specifications } from "../types";
import _ from "lodash";
import { useCallback, useState } from "react";
import { useBoolean } from "ahooks";
import { useTranslation } from "nsp-i18n";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";

const SpecificationCreateForm = (props: {
	status: boolean;
	setStatus: (value: boolean) => void;
}) => {
	const [messageApi, contextHolder] = message.useMessage();
	const [commit, setCommit] = useState<string>("");
	const [contentShow, contentShowAction] = useBoolean(false);
	const [form] = Form.useForm<SpecificationFormType>();
	const globalState = useAppSelector(selectGlobalState);
	const { t } = useTranslation();
	const handlerFinish = async (values: SpecificationFormType) => {
		let messageContent = "";
		if (values.type) {
			messageContent += values.type;
		}
		if (values.scope) {
			messageContent += `(${values.scope})`;
		}
		if (values.description) {
			messageContent += `: ${values.description}`;
		}
		if (values.body) {
			messageContent += "\n\n";
			messageContent += `${values.body}`;
		}
		if (values.changeFiles && values.changeFiles.length > 0) {
			messageContent += "\n\n";
			messageContent += `BREAKING CHANGE: `;
			messageContent += _.map(values.changeFiles, (x) => `\n${x.fileName}${x.fileExtension}`);
		}
		if (values.changeFiles && values.changeFiles.length > 0) {
			messageContent += "\n\n";
			messageContent += `Closes `;
			messageContent += _.map(values.issues, (x) => x.key).join(",");
		}
		setCommit(messageContent);
		if (navigator.clipboard) {
			navigator.clipboard.writeText(messageContent);
			messageApi.success("Copied");
		} else {
			contentShowAction.setTrue();
			messageApi.warning(t("CommitSpecification.FormClipboardNotSupport"));
		}

		return true;
	};
	return (
		<ModalForm<SpecificationFormType>
			title="Git Commit Message"
			open={props.status}
			form={form}
			autoFocusFirstInput
			modalProps={{
				destroyOnClose: true,
				onCancel: () => props.setStatus(false),
				okText: t("CommitSpecification.FormCopyText"),
			}}
			submitTimeout={2000}
			onFinish={(values) => handlerFinish(values)}
		>
			{contextHolder}
			{/* 当只有一个input类型时，可以这样快速使用 */}
			{/* <ProFormItem name={"type"} label="类型" rules={[{ required: true }]}>
				<AutoComplete
					allowClear
					style={{ width: 200 }}
					options={_.map(specifications, (x) => {
						return {
							value: x.type,
						};
					})}
					filterOption={(inputValue, option) =>
						option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
				/>
			</ProFormItem> */}
			{/* 下面是自定义Item含有多个组件时无法确认那一个，可以手动渲染指定 */}
			<ProFormItemRender
				name={"type"}
				label={t("CommitSpecification.FormTypeLabel")}
				rules={[{ required: true }]}
			>
				{(itemProps) => {
					return (
						<Space>
							<AutoComplete
								id={itemProps.id}
								{...pickControlProps(itemProps)}
								allowClear
								style={{ width: 200 }}
								options={_.map(specifications, (x) => {
									return {
										value: x.type,
									};
								})}
								filterOption={(inputValue, option) =>
									option!.value
										.toUpperCase()
										.indexOf(inputValue.toUpperCase()) !== -1
								}
							/>
							<Tooltip
								title={() => {
									const type = form.getFieldValue("type");
									const result = _.find(specifications, (x) => x.type == type);
									return (
										result?.description[globalState.language] ??
										t("CommitSpecification.FromTypeTips")
									);
								}}
							>
								<QuestionCircleOutlined />
							</Tooltip>
						</Space>
					);
				}}
			</ProFormItemRender>
			<ProFormText name={"scope"} label={t("CommitSpecification.FormScopeLabel")} />
			<ProFormText
				name={"description"}
				label={t("CommitSpecification.FormDescriptionLabel")}
			/>
			<ProFormTextArea name={"body"} label={t("CommitSpecification.FormBodyLabel")} />
			<ProFormList
				name="changeFiles"
				label="BREAKING CHANGE"
				copyIconProps={{
					Icon: CopyOutlined,
					tooltipText: t("CommitSpecification.FormDynamicCopyTooltip"),
				}}
				deleteIconProps={{
					Icon: CloseCircleOutlined,
					tooltipText: t("CommitSpecification.FormDynamicDeleteTooltip"),
				}}
			>
				<ProFormGroup key="changeFiles">
					<ProFormText
						name={"fileName"}
						label={t("CommitSpecification.FormFileNameLabel")}
					/>
					{/* <ProForm showSearch name={"fileExtension"} label="值" /> */}
					<ProForm.Item
						name={"fileExtension"}
						label={t("CommitSpecification.FormFileExtensionLabel")}
					>
						<AutoComplete
							allowClear
							style={{ width: 200 }}
							options={fileExtensions}
							filterOption={(inputValue, option) =>
								option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
						/>
					</ProForm.Item>
				</ProFormGroup>
			</ProFormList>
			<ProFormList
				name="issues"
				label="Issues"
				copyIconProps={{
					Icon: CopyOutlined,
					tooltipText: t("CommitSpecification.FormDynamicCopyTooltip"),
				}}
				deleteIconProps={{
					Icon: CloseCircleOutlined,
					tooltipText: t("CommitSpecification.FormDynamicDeleteTooltip"),
				}}
			>
				<ProFormText name={"key"} />
			</ProFormList>
			{contentShow && <Input.TextArea value={commit} readOnly />}
		</ModalForm>
	);
};

export default SpecificationCreateForm;
