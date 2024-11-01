import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/html/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mygrey: "#F9F9F9",
        myred: "#c90000",
        myorange: "#ff9933",
        darkgrey: "#444444",
        mediumgrey: "#5A5A5A",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
});
export default config;
