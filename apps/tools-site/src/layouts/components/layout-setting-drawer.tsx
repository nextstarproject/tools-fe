import { Checkbox, Drawer, Radio, Select, Space, Typography } from "antd";
import { ThemeColorArray, ThemeColorName } from "@project-self/assets/consts/theme-color";
import { setLanguage, setThemeColor, setThemeDark } from "@project-self/rtk/global-slice";
import { selectGlobalState, selectLayoutState } from "@project-self/store/selector";
import { useAppDispatch, useAppSelector } from "@project-self/store/store";
import { setSettingDrawer } from "../rtk/layout-slice";
import { useTranslation } from "nsp-i18n";

const LayoutSettingDrawer = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const globalState = useAppSelector(selectGlobalState);
	const layoutState = useAppSelector(selectLayoutState);
	const onClose = () => {
		dispatch(setSettingDrawer(false));
	};
	return (
		<Drawer
			title={t("Layout.ThemeGlobalSetting")}
			placement="right"
			onClose={onClose}
			open={layoutState.settingDrawer}
		>
			{_IS_DEV_ && (
				<Typography.Paragraph>
					{t("Layout.ThemeSettingDrawerText1")}
					<br />
					{t("Layout.ThemeSettingDrawerText2")}
				</Typography.Paragraph>
			)}
			<Space direction={"vertical"} size={"large"}>
				<Space direction={"vertical"} size={"small"}>
					<Typography.Title level={4}>
						{t("Layout.ThemeSettingDrawerSelectTheme")}
					</Typography.Title>
					<Select
						defaultValue={globalState.theme.primaryColor}
						onChange={(value) => {
							dispatch(setThemeColor(value));
						}}
					>
						{ThemeColorArray.map((x, i) => (
							<Select.Option key={x} value={x}>
								<div className={"flex items-center"}>
									<div
										className={"inline-block w-4 h-4"}
										style={{ backgroundColor: x }}
									></div>
									&nbsp;
									<span>{ThemeColorName[i]}</span>
								</div>
							</Select.Option>
						))}
					</Select>
				</Space>
				<Space direction={"vertical"} size={"small"}>
					<Typography.Title level={4}>
						{t("Layout.ThemeSettingDrawerDarkTheme")}
					</Typography.Title>
					<Checkbox
						onChange={(e) => dispatch(setThemeDark(e.target.checked))}
						defaultChecked={globalState.theme.isDark}
					>
						{t("Layout.ThemeSettingDrawerEnableDarkTheme")}
					</Checkbox>
				</Space>
				{import.meta.env.NSP_LANGUAGE == "true" && (
					<Space direction={"vertical"} size={"small"}>
						<Typography.Title level={4}>
							{t("Layout.ThemeSettingDrawerSelectLanguage")}
						</Typography.Title>
						<Radio.Group
							onChange={(e) => dispatch(setLanguage(e.target.value))}
							value={globalState.language}
						>
							<Radio value={"zh-CN"}>🇨🇳 中文</Radio>
							<Radio value={"en-US"}>🇺🇸 English</Radio>
						</Radio.Group>
					</Space>
				)}
			</Space>
		</Drawer>
	);
};

export default LayoutSettingDrawer;
