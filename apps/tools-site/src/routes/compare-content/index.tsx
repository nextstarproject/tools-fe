import { ProFormItem, QueryFilter } from "@ant-design/pro-components";
import { DiffEditor } from "@monaco-editor/react";
import { selectGlobalState } from "@project-self/store/selector";
import { useAppSelector } from "@project-self/store/store";
import { AutoComplete, Col, Flex, Row, Space } from "antd";
import { useState } from "react";
import { codeLanguageOptions, QueryFormType } from "./types";
import { useTranslation } from "nsp-i18n";

const CompareContent = () => {
	const [codeLanguage, setCodeLanguage] = useState<QueryFormType>({
		original: "text",
		modified: "text",
	});
	const globalState = useAppSelector(selectGlobalState);
	const { t } = useTranslation();
	return (
		<section>
			<Flex className={"h-full"} vertical>
				<QueryFilter<QueryFormType>
					submitter={{
						searchConfig: {
							submitText: t("COMMON.Ok"),
						},
					}}
					onFinish={async (values) => {
						setCodeLanguage(values);
					}}
					initialValues={{ original: "text", modified: "text" }}
				>
					<ProFormItem name={"original"} label={t("CompareContent.Original")}>
						<AutoComplete
							allowClear
							className={"w-56 mb-2"}
							defaultValue={"text"}
							options={codeLanguageOptions}
							filterOption={(inputValue, option) =>
								option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
						/>
					</ProFormItem>
					<ProFormItem name={"modified"} label={t("CompareContent.Modified")}>
						<AutoComplete
							allowClear
							className={"w-56 mb-2"}
							defaultValue={"text"}
							options={codeLanguageOptions}
							filterOption={(inputValue, option) =>
								option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
						/>
					</ProFormItem>
				</QueryFilter>
				<Flex flex={"1 1 auto"}>
					<DiffEditor
						height={"100%"}
						width={"100%"}
						language={"text"}
						originalLanguage={codeLanguage.original}
						modifiedLanguage={codeLanguage.modified}
						theme={globalState.theme.isDark ? "vs-dark" : "light"}
						original="// the original code"
						modified="// the modified code"
						options={{
							originalEditable: true,
						}}
					/>
				</Flex>
			</Flex>
		</section>
	);
};

export default CompareContent;
