import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

const now = new Date();

export default function ({ mode }) {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	// https://vitejs.dev/config/
	const isDev = process.env.NODE_ENV !== "production";
	return defineConfig({
		base: "/",
		envPrefix: ["NSP_"],
		plugins: [
			react(),
			svgr(),
			tsconfigPaths(),
			// @ts-expect-error unknown error
			visualizer({
				filename: "dist/visualizer.html",
				open: false,
			}),
		],
		optimizeDeps: {
			include: ["react/jsx-runtime"],
		},
		css: {
			// config: https://github.com/webpack-contrib/css-loader
			modules: {
				generateScopedName: isDev
					? "nsp_[path][name]_[local]_[hash:base64:10]"
					: "nsp_[hash:base64:16]",
				localsConvention: "camelCaseOnly",
			},
			preprocessorOptions: {
				less: {
					javascriptEnabled: false,
				},
			},
		},
		define: {
			_PROJECT_NAMESPACE_: JSON.stringify(process.env.npm_package_name),
			_MAIN_VERSION_: JSON.stringify(process.env.npm_package_version),
			_BUILD_VERSION_: JSON.stringify(
				`${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, "0")}.${now
					.getDate()
					.toString()
					.padStart(2, "0")}.${now.getHours().toString().padStart(2, "0")}.${now
					.getMinutes()
					.toString()
					.padStart(2, "0")}`
			),
			_IS_DEV_: isDev,
		},
		server: {
			port: 14001,
			host: true,
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						react: ["react", "react-dom", "react-router-dom"],
						redux: ["react-redux", "@reduxjs/toolkit"],
						oidc: ["oidc-client", "redux-oidc"],
						antd: ["antd"],
						nsputils: ["nsp-utils"],
						lodash: ["lodash"],
					},
				},
			},
			sourcemap: isDev,
		},
	});
}
