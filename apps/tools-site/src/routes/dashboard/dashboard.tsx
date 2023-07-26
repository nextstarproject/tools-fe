import { BusinessMenus, MenuItem } from "@project-self/assets/consts/menus";
import { DynamicAntIcon } from "@project-self/components/dynamic-icon/dynamic-icon";
import { selectGlobalState } from "@project-self/store/selector";
import { useAppSelector } from "@project-self/store/store";
import { defaultLanguage } from "@project-self/utils/default-language";
import { Col, Row, Space, theme, Typography } from "antd";
import { xor } from "lodash";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const {
		token: { colorBgContainer, colorText, colorPrimary },
	} = theme.useToken();
	const globalState = useAppSelector(selectGlobalState);
	const renderList = useCallback(
		(businessMenus: MenuItem[]) => {
			return businessMenus.map((pm) => {
				let labelName = pm.name;
				const language = defaultLanguage();
				if (pm.i18n != undefined) {
					if (import.meta.env.NSP_LANGUAGE == "true") {
						labelName = pm.i18n[globalState.language];
					} else {
						labelName = pm.i18n[language];
					}
				}
				return (
					<>
						<Typography.Title key={pm.name} level={3}>
							{labelName}
						</Typography.Title>
						<Row gutter={[16, 8]} key={pm.id} className="mt-6">
							{pm.children &&
								pm.children.length > 0 &&
								pm.children?.map((sm) => {
									let subName = sm.name;
									const language = defaultLanguage();
									if (sm.i18n != undefined) {
										if (import.meta.env.NSP_LANGUAGE == "true") {
											subName = sm.i18n[globalState.language];
										} else {
											subName = sm.i18n[language];
										}
									}
									return (
										<Col key={sm.id} span={6} xl={4}>
											<Link
												className={
													"flex items-center py-3 px-2 border-solid border rounded border-gray-300 hover:border-sky-400 hover:!text-sky-500"
												}
												style={{
													backgroundColor: colorBgContainer,
													color: colorText,
												}}
												to={sm.path ?? ""}
											>
												<DynamicAntIcon
													type={sm.icon ?? "nsp-ns-icon"}
													className={"text-3xl"}
													style={{ color: colorPrimary }}
												/>
												<span className="flex-1 grow mx-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
													{subName}
												</span>
											</Link>
										</Col>
									);
								})}
						</Row>
					</>
				);
			});
		},
		[colorBgContainer, colorPrimary, colorText, globalState.language]
	);
	return <section>{renderList(BusinessMenus)}</section>;
};

export default Dashboard;
