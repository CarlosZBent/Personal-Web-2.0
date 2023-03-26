/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkTheme: "dark",
	daisyui: {
		themes: [
		  {
			mytheme: {
				"primary": "#b4d1e1",      
				"secondary": "#f59e0b",
				"accent": "#facc15",
				"neutral": "#292524",
				"base-100": "#f3f4f6",
				"info": "#819AD9",
				"success": "#73E8A6",
				"warning": "#dc2626",
				"error": "#EF4D78",
			},
			dark: {
				"primary": "#4b5563",      
				"secondary": "#f59e0b",
				"accent": "#991b1b",
				"neutral": "#292524",
				"base-100": "#111827",
				"info": "#819AD9",
				"success": "#73E8A6",
				"warning": "#dc2626",
				"error": "#EF4D78",
			}
		},
		],
	  },
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"),require("daisyui")],
}
