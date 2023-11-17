const baseConfig = require("nsp-lint/eslint-react-preset");
module.exports = {
	...baseConfig,
	rules: {
		"@typescript-eslint/no-namespace": ["off"],
		"@typescript-eslint/ban-ts-comment": ["off"],
	},
};
