import { beforeAll, describe, expect, test } from "vitest";
import { $ } from "execa";
import fs from "fs/promises";
import path from "path";

const tmpDir = `${__dirname}/.remix`;
const $$ = $({ cwd: tmpDir });

const viteConfig = `
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { metronome } from "metronome-sh/vite";

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), metronome()],
});
`;

async function install({ template, dirname }: { template: string; dirname: string }) {
  await $$`rm -rf ${dirname}`;
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

describe(
  "vite plugin",
  () => {
    test("Installs and builds in the express vite template", async () => {
      const dirname = "express-vite";

      await install({
        template: "remix-run/remix/templates/unstable-vite-express",
        dirname,
      });

      const serverBuild = await fs.readFile(
        path.join(tmpDir, dirname, "build/server", "index.js"),
        "utf-8"
      );

      // prettier-ignore
      const metronomeImportRegex = /import\s+\{\s*registerMetronome\s*\}\s+from\s+"metronome-sh\/vite";/;
      expect(serverBuild.match(metronomeImportRegex)?.[0]).toMatchSnapshot();

      // prettier-ignore
      const metronomeExportRegex = /export\s+const\s+metronome\s*=\s*\{\s*"remixPackages":\s*\{\s*"remix\.package\.express":\s*"\^[^"]+",\s*"remix\.package\.node":\s*"\^[^"]+",\s*"remix\.package\.react":\s*"\^[^"]+"\s*\},\s*"endpoint":\s*"https:\/\/metrics\.metronome\.sh"\s*\};/
      expect(serverBuild.match(metronomeExportRegex)?.[0]).toMatchSnapshot();

      // prettier-ignore
      const metronomeWrapperRegex = /const\s+routes\s*=\s*registerMetronome\(\s*\{[\s\S]*?"root"[\s\S]*?\}\s*,\s*\{\s*version:\s*serverManifest\['version'\]\s*\}\s*,\s*metronome\s*\);/
      expect(serverBuild.match(metronomeWrapperRegex)?.[0]).toMatchSnapshot();
    });
  },
  { timeout: 60000 }
);
