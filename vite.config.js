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
	server: {
		cors: {
			origin: [
				/^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
				"https://theme-development-boilerplates.myshopify.com",
			],
		},
	},
	css: {
		postcss: "./postcss.config.js",
	},
});
