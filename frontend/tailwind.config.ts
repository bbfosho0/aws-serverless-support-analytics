import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-strong": "var(--color-surface-strong)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        foreground: "var(--color-foreground)",
        success: "#4ade80",
        warning: "#fb923c",
        danger: "#f87171",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 45px -35px rgba(15, 23, 42, 0.65)",
        glow: "0 0 45px -15px rgba(14, 165, 233, 0.55)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(226,232,240,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.35) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(15,23,42,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.35) 1px, transparent 1px)",
      },
      keyframes: {
        pulseFloat: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        pulseFloat: "pulseFloat 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
