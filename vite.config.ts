import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

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
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
        define: {
            _PROJECT_NAMESPACE_: JSON.stringify(process.env.npm_package_name),
            _MAIN_VERSION_: JSON.stringify(process.env.npm_package_version),
            _BUILD_VERSION_: JSON.stringify(
                `${now.getFullYear()}.${(now.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}.${now
                    .getDate()
                    .toString()
                    .padStart(2, "0")}.${now
                    .getHours()
                    .toString()
                    .padStart(2, "0")}.${now
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`
            ),
            _LOGIN_STATUS_: false,
            _APP_SWITCH_URL: JSON.stringify(""),
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
                        redux: ["redux", "react-redux", "@reduxjs/toolkit"],
                        oidc: ["oidc-client", "redux-oidc"],
                        antd: ["antd"],
                        store: ["store2"],
                        lodash: ["lodash"],
                    },
                },
                // external: ['lodash/default'],
            },
            sourcemap: isDev,
        },
    });
}
