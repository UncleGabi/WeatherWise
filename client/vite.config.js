/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-weather-wise",
  plugins: [react()],
  server: {
    host: "localhost",
    port: "3000",
  },
  build: {
    rollupOptions: {
      output: {
        dir: "../server/public",
      },
    },
  },
});
