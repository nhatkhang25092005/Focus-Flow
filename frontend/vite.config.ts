import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",

    server: {
      deps: {
        inline: ["react", "react-dom"],
      },
    },
  },
})
