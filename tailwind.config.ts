import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "text-secondary": "var(--text-secondary)",
        "bg-hover": "var(--bg-hover)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
      },
    },
  },
  plugins: [],
};
export default config;
