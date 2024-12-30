import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "sofka-light": "#EFEAE4",
        "sofka-orange": "#FF7E08",
      },
      gridTemplateColumns: {
        "task-Item": "1fr auto",
      },
      gridTemplateRows: {
        body: "auto 1fr auto",
      },
      ringColor: {
        "sofka-orange": "#FF7E08",
      },
      textColor: {
        "sofka-orange": "#FF7E08",
      },
    },
  },
  plugins: [],
} satisfies Config;
