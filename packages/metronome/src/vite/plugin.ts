import { Plugin, PluginOption } from "vite";
import MagicString from "magic-string";
import { MetronomeConfig, MetronomeInternalConfig } from "../common/types";
import fs from "fs";
import path from "path";

let metronomeInternalConfig: MetronomeInternalConfig;

export const metronome: (metronomeConfig?: MetronomeConfig) => Plugin = (metronomeConfig) => {
  return {
    apply: "build",
    name: "metronome",
    generateBundle(_, bundle) {
      const serverBuild = Object.entries(bundle).find(([, value]) => {
        const facadeModuleId = (value as any)?.facadeModuleId;
        return facadeModuleId?.includes("virtual:remix/server-build");
      });

      if (!serverBuild) return;

      const [name] = serverBuild;

      const file = bundle[name] as any;

      const magicString = new MagicString(file.code);

      magicString.prepend(`import { registerMetronome } from "metronome-sh/vite";\n`);

      const regex = /const routes = \{([\s\S]*?)\};/m;

      const metronome = JSON.stringify(metronomeInternalConfig, null, 2);

      magicString.replace(regex, (match, p1) => {
        return `export const metronome = ${metronome};\nconst routes = registerMetronome({${p1}}, { version: serverManifest['version'] }, metronome);`;
      });

      file.code = magicString.toString();
      file.map = magicString.generateMap({ hires: true });
    },
    configResolved(config) {
      if (metronomeInternalConfig) return;

      const { root } = config as any;
      const packageJsonPath = path.resolve(root, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      const remixPackages = Object.fromEntries(
        Object.entries(packageJson.dependencies ?? {})
          .filter(([key]) => key.includes("@remix-run/"))
          .map(([key, value]) => [`remix.package.${key.split("/")[1]}`, value])
      ) as Record<string, string>;

      metronomeInternalConfig = {
        ...metronomeConfig,
        remixPackages,
        endpoint: metronomeConfig?.endpoint ?? "https://metrics.metronome.sh",
      };
    },
    transform(code, id) {
      if (id.match(/root\.tsx$/)) {
        const magicString = new MagicString(code);
        magicString.prepend('import { withMetronome } from "metronome-sh/react";\n');
        const defaultExportRegex = /export\sdefault\sfunction/;

        magicString.replace(defaultExportRegex, "const __defaultExport = function");

        magicString.append("export default withMetronome(__defaultExport);");

        return {
          code: magicString.toString(),
          sourcemap: magicString.generateMap({ hires: true }),
        };
      }
    },
  };
};
