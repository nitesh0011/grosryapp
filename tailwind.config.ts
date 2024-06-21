import type { Config } from "tailwindcss"

const config = {
  darkMode: ["className"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        htmlForeground: "hsl(var(--htmlForeground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          htmlForeground: "hsl(var(--primary-htmlForeground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          htmlForeground: "hsl(var(--secondary-htmlForeground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          htmlForeground: "hsl(var(--destructive-htmlForeground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          htmlForeground: "hsl(var(--muted-htmlForeground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          htmlForeground: "hsl(var(--accent-htmlForeground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          htmlForeground: "hsl(var(--popover-htmlForeground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          htmlForeground: "hsl(var(--card-htmlForeground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
    ,
    require('daisyui'),
  ],
} satisfies Config

export default config