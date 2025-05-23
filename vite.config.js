import { defineConfig } from "vite";
import shopify from "vite-plugin-shopify";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		shopify({
			sourceCodeDir: "src",
			entrypointsDir: "src/core",
			additionalEntrypoints: [
				"src/styles/sections/**/*.css",
				"src/styles/sections/**/*.scss",
				"src/js/sections/**/*.js",
				"src/js/components/**/*.js",
			],
		}),
		tailwindcss(),
	],
	css: {
		postcss: "./postcss.config.js",
	},
});
