//参考：https://prettier.io/docs/en/options.html
module.exports = {
	// 一行最多 100 字符
	printWidth: 100,
	// 使用 4 个空格缩进
	tabWidth: 4,
	// 使用缩进符，不使用空格
	useTabs: true,
	// 行尾需要有分号
	semi: true,
	// 使用双引号
	singleQuote: false,
	// 对象的 key 仅在必要时用引号
	quoteProps: "as-needed",
	// jsx 不使用单引号，而使用双引号
	jsxSingleQuote: false,
	// 数组，对象结尾添加尾分号
	trailingComma: "es5",
	// 大括号内的首尾需要空格
	bracketSpacing: true,
	// jsx 标签的反尖括号需要换行
	jsxBracketSameLine: false,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: "always",
	endOfLine: "auto",
	overrides: [
		{
			files: ["*.yml", "*.json"],
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};
