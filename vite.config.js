import { defineConfig } from "vite";
import shopify from "vite-plugin-shopify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		shopify({
			sourceCodeDir: "src",
			entrypointsDir: "src/core",
			snippetTag: "vite-tag.liquid",
		}),
		tailwindcss(),
	],
	css: {
		postcss: "./postcss.config.js",
	},
});
