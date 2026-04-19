import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0a0e14",
        "dark-2": "#0f141c",
        "dark-3": "#141b26",
        line: "#1f2937",
        light: "#e6edf5",
        muted: "#8b97a8",
        accent: "#4cc2ff",
        "accent-2": "#7c3aed",
        ok: "#10b981",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
