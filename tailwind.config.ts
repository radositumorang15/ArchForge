import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF6EF",
          100: "#FDEBDD",
          200: "#FBDCC4",
          300: "#F7C19A",
          400: "#F0A56B",
          500: "#EE833A",
          600: "#E3691A",
          700: "#BF530F",
          800: "#8F3D0B",
          900: "#5E2808",
        },
        bg: {
          0: "#0A0804",
          coral: "#F67455",
          red: "#C54E34",
          "red-deep": "#7B230F",
          brown: "#743811",
          "brown-deep": "#613A13",
        },
        ink: {
          900: "#0A0A0A",
          700: "#3D3D3D",
          600: "#5F5F5F",
          500: "#848484",
          400: "#A8A8A8",
        },
        surface: {
          0: "#FFFFFF",
          50: "#F7F7F7",
          100: "#F3F3F3",
          200: "#E9E9E7",
        },
        line: {
          DEFAULT: "#EEEEEC",
          strong: "#D4D4D4",
        },
        accent: {
          ink: "#BF530F",
        },
        status: {
          danger: "#E0262F",
          success: "#2F9E4F",
          "success-ink": "#217A3C",
          warning: "#F5A524",
          info: "#2F6BD8",
        },
      },
      borderRadius: {
        shell: "24px",
        panel: "20px",
        card: "16px",
        media: "12px",
        thumb: "10px",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,.04), 0 8px 24px -12px rgba(10,10,10,.12)",
        bubble: "0 1px 3px rgba(10,10,10,.08)",
        pop: "0 12px 40px -8px rgba(10,10,10,.25)",
        glow: "0 8px 20px -8px rgba(238,131,58,.6)",
      },
    },
  },
  plugins: [],
};

export default config;

