import { describe, expect, it } from "vitest";
import { $ } from "execa";
import fs from "fs/promises";
import path from "path";

const tmpDir = `${__dirname}/__remix__`;
const $$ = $({ cwd: tmpDir });

const viteConfig = `
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), metronome()],
});
`.trim();

async function install({ template, dirname }: { template: string; dirname: string }) {
  // For some reason npx has a weird interaction with create-remix in setting up the dirname
  await $$`pnpm dlx create-remix@latest --template ${template} --no-install --yes ${dirname}`;

  const packageJsonPath = path.join(tmpDir, dirname, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

  packageJson.dependencies["metronome-sh"] = "file:../../../../../.";
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  await $$`npm install --prefix ${dirname}`;

  await fs.writeFile(path.join(tmpDir, dirname, "vite.config.ts"), viteConfig);

  await $$`npm run build --prefix ${dirname}`;
}

function cleanup(dirname: string) {
  return $$`rm -rf ${dirname}`;
}

describe(
  "vite plugin",
  () => {
    it("Installs and builds in the express vite template", async () => {
      // Generate random dirname to avoid conflicts
      const dirname = "remix-express-" + Math.random().toString(36).substring(7);

      await install({
        template: "remix-run/remix/templates/express",
        dirname,
      });

      const serverBuild = await fs.readFile(
        path.join(tmpDir, dirname, "build/server", "index.js"),
        "utf-8"
      );

      expect(serverBuild).toMatchSnapshot();

      const files = await fs.readdir(path.join(tmpDir, dirname, "build/client/assets"));

      const rootFile = files.find((file) => file.startsWith("root-"));

      expect(rootFile).toBeDefined();

      const rootBuild = await fs.readFile(
        path.join(tmpDir, dirname, "build/client/assets", rootFile!),
        "utf-8"
      );

      expect(rootBuild).toMatchSnapshot();

      await cleanup(dirname);
    });
  },
  { timeout: 60000 }
);
