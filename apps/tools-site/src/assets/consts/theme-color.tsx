/**
 * 主题色
 * @description 添加颜色后，请在https://ant.design/theme-editor-cn获取其他颜色（包含黑暗主题），并将其添加到下列地方
 * dynmaic-icon 文件中
 * */
export enum ThemeColor {
	// 默认主题
	Primary = "#1677ff",
	Blue = "#1890ff",
	Red = "#f5222d",
	Orange = "#fa541c",
	Yellow = "#faad14",
	Green = "#00b96b",
}

export const ThemeColorArray = [
	ThemeColor.Primary,
	ThemeColor.Blue,
	ThemeColor.Red,
	ThemeColor.Orange,
	ThemeColor.Yellow,
	ThemeColor.Green,
];

export const ThemeColorName = Object.keys(ThemeColor);
