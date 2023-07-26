import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
			formats: ["es"],
			name: "nsp-utils",
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				// Since we publish our ./src folder, there's no point
				// in bloating sourcemaps with another copy of it.
				sourcemapExcludeSources: true,
			},
		},
		sourcemap: true,
		// Reduce bloat from legacy polyfills.
		target: "esnext",
		// Leave minification up to applications.
		minify: false,
	},
});
