import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/[lang]/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "pattern": "url('../assets/images/header/bg-light.svg')",
        "pattern-dark": "url('../assets/images/header/bg-dark.svg')",
      },
      fontFamily: {
        sans: ["var(--pinewoodSans)", "sans"],
      },
    },
  },
  plugins: [],
};
export default config;
