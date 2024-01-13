import { PluginOption } from "vite";
import MagicString from "magic-string";
import superjson from "superjson";

export interface MetronomeConfig {
  endpoint?: string | null;
  ignoredRoutes?: (string | RegExp)[];
  ignoredPathnames?: (string | RegExp)[];
}

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

      const configString = superjson.stringify(config);

      magicString.replace(regex, (match, p1) => {
        return `const routes = registerMetronome({${p1}}, '${configString}');`;
      });

      file.code = magicString.toString();
    },
  };
}
