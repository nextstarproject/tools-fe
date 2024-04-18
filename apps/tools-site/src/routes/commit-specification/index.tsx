import { ProColumns, ProTable } from "@ant-design/pro-components";
import { specifications, SpecificationType } from "./types";
import { Button, ColorPicker, Tag, Typography } from "antd";
import { useAppSelector } from "@project-self/store/store";
import { Languages, useTranslation } from "nsp-i18n";
import { selectGlobalState } from "@project-self/store/selector";
import { ReactNode } from "react";
import _ from "lodash";
import { useBoolean } from "ahooks";
import SpecificationCreateForm from "./components/create-form";

const CommitSpecification = () => {
	const [modalStatus, modalStatusAction] = useBoolean(false);
	const globalState = useAppSelector(selectGlobalState);
	const { t } = useTranslation();
	const columnGenerate = (i18n: Languages): ProColumns<SpecificationType>[] => {
		return [
			{
				title: t("CommitSpecification.GridFullColumn"),
				dataIndex: "name",
				copyable: false,
				hideInSearch: true,
				fixed: "left",
				renderText: (value: string) => value,
				render: (renderText: ReactNode, record) => {
					return (
						<Tag color={record.color}>
							{record.icon} {record.type}
						</Tag>
					);
				},
			},
			{
				title: t("CommitSpecification.FormTypeLabel"),
				dataIndex: "type",
				valueType: "text",
				copyable: true,
				sorter: true,
				width: 150,
			},
			{
				title: "Icon",
				dataIndex: "icon",
				copyable: true,
				hideInSearch: true,
				width: 120,
			},
			{
				title: t("CommitSpecification.GirdColorColumn"),
				dataIndex: "color",
				copyable: true,
				hideInSearch: true,
				width: 200,
				renderText: (value: string) => value,
				render: (renderText: ReactNode, record) => (
					<ColorPicker
						defaultValue={record.color}
						showText={(color) => (
							<Typography.Paragraph copyable style={{ margin: 0 }}>
								{color.toHexString()}
							</Typography.Paragraph>
						)}
					/>
				),
			},
			{
				title: t("CommitSpecification.GridDescriptionColumn"),
				dataIndex: "description",
				hideInSearch: true,
				renderText: (value: Record<Languages, string>) => value[i18n],
			},
		];
	};
	return (
		<section>
			<ProTable<SpecificationType>
				// 隐藏列，但是在列设置中存在
				// columnsState={{
				// 	defaultValue: {
				// 		description: {
				// 			show: false,
				// 		},
				// 	},
				// }}
				tableStyle={{ minHeight: "500px" }}
				columns={columnGenerate(globalState.language)}
				scroll={{ x: 400, y: 460 }}
				request={async (params, sorter, filter) => {
					const scopeKeyword = params["type"];
					let newSpecifications: SpecificationType[] = _.sortBy(
						specifications,
						(x) => x.key
					);
					if (scopeKeyword) {
						newSpecifications = _.filter(specifications, (x) =>
							x.type.includes(scopeKeyword)
						);
					}
					if (sorter) {
						newSpecifications = _.sortBy(newSpecifications, (x) => x.key);
						if (sorter["type"]) {
							newSpecifications =
								sorter["type"] == "descend"
									? _.sortBy(newSpecifications, (x) => x.key).reverse()
									: _.sortBy(newSpecifications, (x) => x.key);
						}
					}
					return Promise.resolve({
						data: newSpecifications,
						success: true,
					});
				}}
				rowKey="key"
				pagination={false}
				search={{
					layout: "vertical",
					defaultCollapsed: true,
					showHiddenNum: true,
				}}
				toolBarRender={() => [
					<Button
						type="primary"
						key="primary"
						onClick={() => modalStatusAction.setTrue()}
					>
						{t("CommitSpecification.CreateFormButtonText")}
					</Button>,
				]}
			/>
			<SpecificationCreateForm status={modalStatus} setStatus={modalStatusAction.set} />
		</section>
	);
};

export default CommitSpecification;
