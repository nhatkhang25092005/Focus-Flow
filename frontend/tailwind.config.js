/** @type {import('tailwindcss').Config} */
// import type { Config } from "tailwindcss"
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Virgil", "sans-serif"],
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-5px)", opacity: "0.7" },
        },
      },
      animation: {
        text_wave: "wave 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

// export default config
