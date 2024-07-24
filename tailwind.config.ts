import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
      colors: {
        "dark-green": "#1E7047",
        "light-green": "#B8D39D",
        "pink": "#FF3B99",
        "lilac": "#C3A8CC",
        "light-blue": "#A2C7FF",
        "dark-gray": "#202020",
        "darkest-gray": "#121212",
      },
      boxShadow: {
        'custom': '-3px 3px 0 black',
        'custom-card': '-6px 6px 0 black',
      },
      dropShadow: {
        'custom': '6px 0px 0 black',
      },
      screens: {
        "vsm": "320px",
      },
    },
  },
  plugins: [],
};
export default config;
