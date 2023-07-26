import { Button, Dropdown, MenuProps, Modal, Space, Tooltip } from "antd";
import { GithubOutlined, GlobalOutlined, TranslationOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@project-self/store/store";
import { selectGlobalState } from "@project-self/store/selector";
import { setLanguage, setThemeDark } from "@project-self/rtk/global-slice";
import { Languages, useTranslation } from "nsp-i18n";
import { setSettingDrawer } from "../rtk/layout-slice";
import { useCallback } from "react";
import { DynamicAntIcon } from "@project-self/components/dynamic-icon/dynamic-icon";
import { AHrefRelAllNo } from "@project-self/assets/consts/html-tag-consts";

/**
 * @description 语言下拉菜单
 */
const LanguageDropdownMenus: MenuProps["items"] = [
	{
		label: "🇨🇳 中文",
		key: "zh-CN",
	},
	{
		label: "🇺🇸 English",
		key: "en-US",
	},
];

/**
 * @description 顶部右侧组件
 * @returns
 */
const LayoutHeaderRight = () => {
	const { t } = useTranslation();
	const globalState = useAppSelector(selectGlobalState);
	const dispatch = useAppDispatch();

	const handleLanguageMenuClick = useCallback(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(e: any) => {
			const selectLang = e.key as Languages;
			if (globalState.language != selectLang) {
				dispatch(setLanguage(selectLang));
			}
		},
		[globalState.language, dispatch]
	);

	const handleClickVersion = useCallback(() => {
		Modal.info({
			title: t("Layout.VersionInfo"),
			content: (
				<div>
					<p>
						v{_MAIN_VERSION_} {_BUILD_VERSION_}
					</p>
				</div>
			),
		});
	}, [t]);

	return (
		<div className={"flex flex-row items-center flex-1 justify-end h-full"}>
			<Space>
				{import.meta.env.NSP_THEME_CONFIG == "true" && (
					<>
						<Tooltip placement="bottom" title={t("Layout.ThemeGlobalSetting")}>
							<Button
								icon={<GlobalOutlined />}
								onClick={() => dispatch(setSettingDrawer(true))}
							/>
						</Tooltip>
						{globalState.theme.isDark ? (
							<Tooltip placement="bottom" title={t("Layout.DayTheme")}>
								<Button
									icon={<DynamicAntIcon type="nsp-icons-sun" />}
									onClick={() => dispatch(setThemeDark(false))}
								/>
							</Tooltip>
						) : (
							<Tooltip placement="bottom" title={t("Layout.NightTheme")}>
								<Button
									icon={<DynamicAntIcon type="nsp-Moon" />}
									onClick={() => dispatch(setThemeDark(true))}
								/>
							</Tooltip>
						)}
					</>
				)}

				{import.meta.env.NSP_LANGUAGE == "true" && (
					<Dropdown
						menu={{
							items: LanguageDropdownMenus,
							onClick: handleLanguageMenuClick,
						}}
						placement={"bottomRight"}
					>
						<Button icon={<TranslationOutlined />} />
					</Dropdown>
				)}
				<Button
					icon={<GithubOutlined />}
					href={"https://github.com/nextstarproject/tools-fe"}
					target={"_blank"}
					rel={AHrefRelAllNo}
				/>
				<Button icon={<DynamicAntIcon type="nsp-about" />} onClick={handleClickVersion} />
			</Space>
		</div>
	);
};
export default LayoutHeaderRight;
