import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ArabicAutoDateInput",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.tsx"),
      },
      external: ["react", "react-dom", "date-fns/locale/ar", "date-fns/locale"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: "index.css",
      },
    },
  },
});
