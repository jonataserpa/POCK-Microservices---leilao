import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    alias: {
      "@repo/ui-kit": path.resolve(
        __dirname,
        "../../packages/ui-kit/src/index.tsx",
      ),
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
