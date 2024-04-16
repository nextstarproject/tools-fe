import { Color } from "antd/es/color-picker";
import { Languages } from "nsp-i18n";

export type specificationType = {
	key: string;
	name: string;
	icon: string;
	color: Color | string;
	description: Record<Languages, string>;
};
export const specifications: specificationType[] = [
	{
		key: "fix",
		name: "fix",
		icon: "🐛",
		color: "#f5222d",
		description: {
			"zh-CN": "项目bug修复",
			"en-US": "bug fix",
		},
	},
	{
		key: "hotfix",
		name: "hotfix",
		icon: "🐞",
		color: "#cf1322",
		description: {
			"zh-CN": "项目紧急bug修复",
			"en-US": "项目紧急bug修复",
		},
	},
	{
		key: "feat",
		name: "feat",
		icon: "🆕",
		color: "#40a9ff",
		description: {
			"zh-CN": "项目feature",
			"en-US": "项目feature",
		},
	},
	{
		key: "chore",
		name: "chore",
		icon: "🦠",
		color: "#2f54eb",
		description: {
			"zh-CN": "项目杂项",
			"en-US": "project chore",
		},
	},
];
