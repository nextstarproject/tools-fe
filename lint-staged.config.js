/**
 * root-level lint-staged config. each package/app can override by create own lint-staged.config.js file.
 * @see https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo
 * !@note the glob match key's resolve root path is the same path with .git. NOT Root Path.
 */
module.exports = {
	"apps/**/*.{js,ts,jsx,tsx}": ["eslint --color --fix"],
	"apps/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
	// 'projects/**/*.{ts,tsx}': ['tsc --noEmit'],
	"packages/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
	"packages/**/*.{js,ts,jsx,tsx}": ["eslint --color --fix"],
	// 'packages/**/*.{ts,tsx}': ['tsc --noEmit'],
	"components/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
	"components/**/*.{js,ts,jsx,tsx}": ["eslint --color --fix"],
	// 'components/**/*.{ts,tsx}': ['tsc --noEmit'],
	"configs/**/*.{js,jsx,ts,tsx,json,css,scss,md}": ["prettier --write"],
};
