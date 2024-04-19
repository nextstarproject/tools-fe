import Editor from "@monaco-editor/react";
import { Alert, Col, Row, theme } from "antd";
import ReactJson from "@microlink/react-json-view";
import { useState } from "react";
import { useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";
import logger from "@project-self/utils/logger";
import { useThrottleFn } from "ahooks";

const JsonPage = () => {
	const globalState = useAppSelector(selectGlobalState);
	const [jsonStr, setJsonStr] = useState<string>(`{}`);
	const [jsonObject, setJsonObject] = useState<object>({});
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
			<Row className={"h-full"}>
				<Col span={12}>
					<Editor
						width={"100%"}
						height={"100%"}
						theme={globalState.theme.isDark ? "vs-dark" : "light"}
						defaultLanguage="json"
						value={jsonStr}
						onChange={(value) => {
							setJsonStr(value ?? "{}");
							handlerJsonParse();
						}}
					/>
				</Col>
				<Col span={12}>
					<ReactJson
						style={{
							backgroundColor: colorBgContainer,
							height: "100%",
						}}
						name={false}
						src={jsonObject}
						collapsed={false}
						displayObjectSize={true}
						displayDataTypes={false}
						collapseStringsAfterLength={false}
						theme={globalState.theme.isDark ? "tomorrow" : "rjv-default"}
					/>
				</Col>
				<Col span={24} className={"pt-2"}>
					<Alert type={"info"} message={"错误JSON将不会解析到右边"} />
				</Col>
			</Row>
		</section>
	);
};

export default JsonPage;
