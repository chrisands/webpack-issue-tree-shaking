import { defineConfig } from "vite";

export default defineConfig({
  mode: "production",
  build: {
    rollupOptions: {
      input: {
        main: "./src/index.js",
      },
    },
  },
});
