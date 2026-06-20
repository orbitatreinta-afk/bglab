import { type Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ibta: {
          dark: "#003087",
          primary: "#0055B8",
          light: "#1a7de0",
          lighter: "#e6f0fa",
          accent: "#f5f9ff",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ibta-gradient": "linear-gradient(135deg, #003087 0%, #0055B8 100%)",
        "ibta-gradient-light": "linear-gradient(135deg, #0055B8 0%, #1a7de0 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;