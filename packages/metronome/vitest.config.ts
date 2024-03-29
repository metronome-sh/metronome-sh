/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    restoreMocks: true,
    alias: {
      "@asyncLocalStorage": path.resolve(__dirname, "src/common/asyncLocalStorage"),
    },
    setupFiles: [path.resolve(__dirname, "vitest/setup.ts")],
  },
});
