import { PluginOption } from "vite";
import MagicString from "magic-string";
import superjson from "superjson";
import { MetronomeConfig } from "../types";
import fs from "fs";
import path from "path";

let remixPackages: Record<string, string> = {};

export function metronome(config?: MetronomeConfig): PluginOption {
  return {
    apply: "build",
    name: "metronome",
    generateBundle(options, bundle) {
      const serverBuild = Object.entries(bundle).find(([, value]) => {
        const facadeModuleId = (value as any)?.facadeModuleId;
        return facadeModuleId?.includes("virtual:remix/server-build");
      });

      if (!serverBuild) return;

      const [name] = serverBuild;

      const file = bundle[name] as any;

      const magicString = new MagicString(file.code);

      magicString.prepend(
        `import { registerMetronome } from 'metronome-sh/vite';\n`
      );

      const regex = /const routes = \{([\s\S]*?)\};/m;

      const configString = superjson.stringify({ ...config, remixPackages });

      magicString.replace(regex, (match, p1) => {
        return `const routes = registerMetronome({${p1}}, { version: serverManifest['version'] }, '${configString}');`;
      });

      file.code = magicString.toString();
    },
    configResolved(config) {
      if (Object.values(remixPackages).length !== 0) return;

      const root = config.root;

      const packageJsonPath = path.resolve(root, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      remixPackages = Object.fromEntries(
        Object.entries(packageJson.dependencies ?? {})
          .filter(([key]) => key.includes("@remix-run/"))
          .map(([key, value]) => [`remix.package.${key.split("/")[1]}`, value])
      ) as Record<string, string>;
    },
    // transform(code, id) {
    //   console.log({ id });
    //   return {
    //     code,
    //     map: null, // Provide a source map if needed
    //   };
    // },
  };
}
