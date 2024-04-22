import Editor from "@monaco-editor/react";
import { theme } from "antd";
import ReactJson from "@microlink/react-json-view";
import { useState } from "react";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";
import logger from "@project-self/utils/logger";
import { useSize, useThrottleFn } from "ahooks";
import { ProCard } from "@ant-design/pro-components";
import { useTranslation } from "nsp-i18n";

const JsonPage = () => {
	const globalState = useAppSelector(selectGlobalState);
	const [jsonStr, setJsonStr] = useState<string>(`{}`);
	const [jsonObject, setJsonObject] = useState<object>({});
	const size = useSize(document.querySelector("body"));
	const { t } = useTranslation();
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { run: handlerJsonParse } = useThrottleFn(
		() => {
			try {
				setJsonObject(JSON.parse(jsonStr));
			} catch (error) {
				logger.LogError({ controllerName: "json format", actionName: "json parse", error });
			}
		},
		{
			wait: 1000,
		}
	);
	return (
		<section>
			<ProCard
				className={"h-full"}
				title={t("JsonParse.Title")}
				split={"vertical"}
				bordered
				headerBordered
			>
				<ProCard title={t("JsonParse.LeftTitle")} colSpan="50%">
					<Editor
						height={size?.height == undefined ? 460 : size?.height - 169 - 128}
						theme={globalState.theme.isDark ? "vs-dark" : "light"}
						defaultLanguage="json"
						value={jsonStr}
						onChange={(value) => {
							setJsonStr(value ?? "{}");
							handlerJsonParse();
						}}
					/>
				</ProCard>
				<ProCard title={t("JsonParse.RightTitle")}>
					<ReactJson
						style={{
							backgroundColor: colorBgContainer,
							width: "100%",
							height: `${
								size?.height == undefined ? 460 : size?.height - 169 - 128
							}px`,
							overflow: "auto",
						}}
						name={false}
						src={jsonObject}
						collapsed={false}
						displayObjectSize={true}
						displayDataTypes={false}
						collapseStringsAfterLength={false}
						theme={globalState.theme.isDark ? "tomorrow" : "rjv-default"}
					/>
				</ProCard>
			</ProCard>
		</section>
	);
};

export default JsonPage;
