import { describe, expect, test } from "vitest";
import { $ } from "execa";
import fs from "fs/promises";
import path from "path";

const tmpDir = `${__dirname}/.remix`;
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
    test("Installs and builds in the express vite template", async () => {
      // Generate random dirname to avoid conflicts
      const dirname = "express-vite-" + Math.random().toString(36).substring(7);

      await install({
        template: "remix-run/remix/templates/express",
        dirname,
      });

      const serverBuild = await fs.readFile(
        path.join(tmpDir, dirname, "build/server", "index.js"),
        "utf-8"
      );

      // prettier-ignore
      const metronomeImportRegex = /import\s+\{\s*registerMetronome\s*\}\s+from\s+"metronome-sh\/server";/;

      expect(serverBuild.match(metronomeImportRegex)?.[0]).toBeDefined();
      expect(serverBuild.match(metronomeImportRegex)?.[0]).toMatchSnapshot();

      // prettier-ignore
      const metronomeExportRegex = /export\s+const\s+metronome\s=\s{"remixPackages":{"package.remix.express":"\^.*","package.remix.node":"\^.*","package.remix.react":"\^.*","package.react":"\^.*","package.react-dom":"\^.*"},"endpoint":"https:\/\/metrics.metronome.sh","version":"\w+"};/;

      expect(serverBuild.match(metronomeExportRegex)?.[0]).toBeDefined();

      // prettier-ignore
      const metronomeWrapperRegex = /const\s+routes\s*=\s*registerMetronome\(\s*\{[\s\S]*?"root"[\s\S]*?\}\s*,\s*metronome\s*\);/;

      expect(serverBuild.match(metronomeWrapperRegex)?.[0]).toBeDefined();
      expect(serverBuild.match(metronomeWrapperRegex)?.[0]).toMatchSnapshot();

      const withMetronomeRegex = /withMetronome/;

      expect(serverBuild.match(withMetronomeRegex)?.[0]).toBeDefined();
      expect(serverBuild.match(withMetronomeRegex)?.[0]).toMatchSnapshot();

      const files = await fs.readdir(path.join(tmpDir, dirname, "build/client/assets"));

      const rootFile = files.find((file) => file.startsWith("root-"));

      expect(rootFile).toBeDefined();

      const rootBuild = await fs.readFile(
        path.join(tmpDir, dirname, "build/client/assets", rootFile!),
        "utf-8"
      );

      const metronomeQueueRegex = /__metronomeQueue/;

      expect(rootBuild.match(metronomeQueueRegex)?.[0]).toBeDefined();
      expect(rootBuild.match(metronomeQueueRegex)?.[0]).toMatchSnapshot();

      await cleanup(dirname);
    });
  },
  { timeout: 60000 }
);
