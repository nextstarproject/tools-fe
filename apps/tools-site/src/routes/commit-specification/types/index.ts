import { Languages } from "nsp-i18n";

export type SpecificationFormType = {
	type: string;
	scope: string;
	description: string;
	body: string;
	changeFiles: { fileName: string; fileExtension: [] }[];
	issues: { key: string }[];
};

export const fileExtensions: { value: string }[] = [
	{
		value: ".cs",
	},
	{
		value: ".html",
	},
	{
		value: ".js",
	},
	{
		value: ".css",
	},
	{
		value: ".tsx",
	},
	{
		value: ".jsx",
	},
	{
		value: ".json",
	},
	{
		value: ".php",
	},
	{
		value: ".scss",
	},
	{
		value: ".less",
	},
	{
		value: ".sass",
	},
	{
		value: ".py",
	},
	{
		value: ".java",
	},
	{
		value: ".c",
	},
	{
		value: ".cpp",
	},
	{
		value: ".h",
	},
	{
		value: ".sql",
	},
	{
		value: ".xml",
	},
	{
		value: ".md",
	},
	{
		value: ".yaml",
	},
	{
		value: ".yml",
	},
	{
		value: ".ps1",
	},
];

export type SpecificationType = {
	key: number;
	type: string;
	icon: string;
	color: string;
	description: Record<Languages, string>;
};

export const specifications: SpecificationType[] = [
	{
		key: 1,
		type: "fix",
		icon: "🐛",
		color: "#f5222d",
		description: {
			"zh-CN": "错误修复",
			"en-US": "A bug fix",
		},
	},
	{
		key: 2,
		type: "hotfix",
		icon: "🐞",
		color: "#cf1322",
		description: {
			"zh-CN": "紧急错误修复",
			"en-US": "A hot fix",
		},
	},
	{
		key: 3,
		type: "feat",
		icon: "🆕",
		color: "#40a9ff",
		description: {
			"zh-CN": "新功能",
			"en-US": "A new feature",
		},
	},
	{
		key: 4,
		type: "docs",
		icon: "🧾",
		color: "#096dd9",
		description: {
			"zh-CN": "仅更改文档文件",
			"en-US": "Documentation only changes",
		},
	},
	{
		key: 5,
		type: "style",
		icon: "🦠",
		color: "#096dd9",
		description: {
			"zh-CN": "不影响代码含义的改动（空白、格式、分号缺失等）",
			"en-US":
				"Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
		},
	},
	{
		key: 6,
		type: "refactor",
		icon: "🔨",
		color: "#fadb14",
		description: {
			"zh-CN": "既不修复错误也不增加功能的代码更改, 只对原有代码进行重构",
			"en-US":
				"A code change that neither fixes a bug nor adds a feature, only refactoring of the original code",
		},
	},
	{
		key: 7,
		type: "pref",
		icon: "⚡️",
		color: "#ffec3d",
		description: {
			"zh-CN": "改进性能的代码变更",
			"en-US": "A code change that improves performance",
		},
	},
	{
		key: 8,
		type: "test",
		icon: "🧪",
		color: "#1890ff",
		description: {
			"zh-CN": "添加缺失的测试或纠正现有测试",
			"en-US": "Adding missing tests or correcting existing tests",
		},
	},
	{
		key: 9,
		type: "build",
		icon: "🚀",
		color: "#1890ff",
		description: {
			"zh-CN": "影响构建系统或外部依赖关系的变更（示例范围：gulp、brocoli、npm）",
			"en-US":
				"Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
		},
	},
	{
		key: 10,
		type: "ci",
		icon: "✨",
		color: "#d4b106",
		description: {
			"zh-CN":
				"更改我们的 cI 配置文件和脚本（示例范围：Travis、circle、Browserstack、Saucelabs、Github Actions 等）",
			"en-US":
				"Changes to our cI configuration files and scripts (example scopes: Travis, circle, Browserstack, Saucelabs, Github Actions etc)",
		},
	},
	{
		key: 11,
		type: "chore",
		icon: "🦠",
		color: "#2f54eb",
		description: {
			"zh-CN": "不修改 src 或测试文件的其他更改",
			"en-US": "Other changes that don't modify src or test files",
		},
	},
	{
		key: 12,
		type: "revert",
		icon: "⏪",
		color: "#531dab",
		description: {
			"zh-CN": "还原先前的提交",
			"en-US": "Reverts a previous commit",
		},
	},
	{
		key: 13,
		type: "i18n",
		icon: "🌐",
		color: "#597ef7",
		description: {
			"zh-CN": "多语言国际化",
			"en-US": "Multilingual Internationalisation",
		},
	},
	{
		key: 14,
		type: "init",
		icon: "🎉",
		color: "#52c41a",
		description: {
			"zh-CN": "初始化",
			"en-US": "Initialisation",
		},
	},
	{
		key: 15,
		type: "important",
		icon: "🚀",
		color: "#a8071a",
		description: {
			"zh-CN": "重要",
			"en-US": "Important",
		},
	},
	{
		key: 16,
		type: "security",
		icon: "🛡️",
		color: "#cf1322",
		description: {
			"zh-CN": "修复安全问题",
			"en-US": "Fixing Security Issues",
		},
	},
	{
		key: 18,
		type: "docker",
		icon: "🐳",
		color: "#36cfc9",
		description: {
			"zh-CN": "修改 dockerfile 等文件",
			"en-US": "Modify dockerfile and other files",
		},
	},
];
