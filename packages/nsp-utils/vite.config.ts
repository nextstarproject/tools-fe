import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	build: {
		lib: {
			entry: "src/index.ts",
			formats: ["es", "iife", "umd"],
			name: "nspUtils",
			fileName: (format) => `nsp-utils.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				// Since we publish our ./src folder, there's no point
				// in bloating sourcemaps with another copy of it.
				sourcemapExcludeSources: true,
			},
			//@ts-ignore ignore rollup error
			plugins: [commonjs(), terser()],
		},
		sourcemap: true,
		// Reduce bloat from legacy polyfills.
		target: "esnext",
		// Leave minification up to applications.
		minify: false,
	},
});
