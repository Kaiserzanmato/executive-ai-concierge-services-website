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
        ink: {
          950: "#050505",
          900: "#0A0A0B",
          800: "#111113",
          700: "#1B1B1F",
          600: "#2A2A30",
        },
        ivory: {
          50: "#F8F6F0",
          100: "#EEEAE0",
          200: "#DAD2C1",
        },
        platinum: {
          100: "#E8E8E8",
          200: "#C8C8C8",
          300: "#A7A7A7",
        },
        gold: {
          100: "#F5E7C2",
          300: "#D8B76A",
          500: "#A47A2B",
        },
        signal: {
          blue: "#7EA7FF",
          green: "#94E2B0",
          red: "#FF8C8C",
        },
      },
      fontFamily: {
        display: ["Inter", "SF Pro Display", "Helvetica Neue", "Arial", "sans-serif"],
        editorial: ["Playfair Display", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        luxury: "0 30px 100px rgba(0,0,0,0.45)",
        glow: "0 0 80px rgba(216,183,106,0.10)",
        panel: "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 80px rgba(0,0,0,0.32)",
      },
      borderRadius: {
        executive: "28px",
        soft: "18px",
      },
      letterSpacing: {
        executive: "-0.055em",
        tightLuxury: "-0.035em",
      },
      animation: {
        floatSlow: "floatSlow 8s ease-in-out infinite",
        fadeUp: "fadeUp 700ms ease both",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.72" },
          "50%": { opacity: "1" },
        },
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
