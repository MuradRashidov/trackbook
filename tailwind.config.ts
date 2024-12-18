import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lSky: "#c3ebfa",
        lSkyLight: "#edf9fd",
        lPurple: "#cfceff",
        lPurpleLight: "#f1f0ff",
        lYellow: "#fae27c",
        lYellowLight: "#fefceb"

      },
    },
  },
  plugins: [],
} satisfies Config;
