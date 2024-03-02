import { Plugin } from "vite";
import MagicString from "magic-string";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import AdmZip from "adm-zip";
import fetch, { fileFromSync } from "node-fetch";
import pc from "picocolors";
import boxen from "boxen";
import { METRONOME_METRICS_VERSION } from "../common/constants";
import { MetronomeConfig, MetronomeResolvedConfig } from "../common/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceMapDirectoryPath = path.join(__dirname, "sourcemaps");

let metronomeResolvedConfig: MetronomeResolvedConfig;
let didOverrideSourcemapConfig: boolean = false;

const sourceMapMapping: Record<string, string> = {};
const sourceMaps: Record<string, string> = {};

let __remixPluginResolvedConfig: any;
let version: string;
let serverBuildRan: boolean = false;
let clientBuildRan: boolean = false;

export const metronome: (metronomeConfig?: MetronomeConfig) => Plugin[] = (metronomeConfig) => {
  const sourcemapsPlugin: Plugin = {
    name: "metronome-sourcemaps",
    apply: "build",
    enforce: "pre",

    config(config) {
      if (typeof config.build?.sourcemap === "undefined" || config.build?.sourcemap === false) {
        didOverrideSourcemapConfig = true;
        const build = { ...(config.build ?? {}), sourcemap: "hidden" as const };
        config.build = build;
      }
    },
    async configResolved(resolvedViteConfig) {
      const originalWarn = resolvedViteConfig.logger.warn;
      resolvedViteConfig.logger.warn = (
        ...args: Parameters<typeof resolvedViteConfig.logger.warn>
      ) => {
        const [message] = args;

        if (
          message.includes("Source maps are enabled in production") &&
          didOverrideSourcemapConfig
        ) {
          return;
        }

        originalWarn(...args);
      };
    },
    generateBundle(options, bundle) {
      const { dir } = options;

      if (!dir) return;

      const relative = path.relative(__remixPluginResolvedConfig.rootDirectory, dir);

      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type !== "chunk" || file.map === null) continue;
        const relativeFilePath = path.join(relative, fileName);

        // create the hash for the file
        const filenameHash = crypto.createHash("md5").update(file.code).digest("hex") + ".js.map";
        sourceMapMapping[relativeFilePath] = filenameHash;
        sourceMaps[filenameHash] = file.map.toString();
      }
    },
    async writeBundle(options) {
      if (didOverrideSourcemapConfig) {
        Object.keys(sourceMapMapping).forEach((key) => {
          const filePath = path.join(__remixPluginResolvedConfig.rootDirectory, key + ".map");

          if (fs.existsSync(filePath)) {
            fs.rmSync(filePath);
          }
        });
      }

      const { dir } = options;
      const serverDir = path.join(
        __remixPluginResolvedConfig.rootDirectory,
        __remixPluginResolvedConfig.serverBuildDirectory
      );

      if (!clientBuildRan) {
        clientBuildRan = dir !== serverDir;
      }

      if (!serverBuildRan) {
        serverBuildRan = dir === serverDir;
      }

      if (serverBuildRan && clientBuildRan) {
        const apiKey = metronomeResolvedConfig.apiKey ?? process.env.METRONOME_API_KEY;

        if (!apiKey) {
          console.log(
            pc.yellow(
              boxen(
                `Metronome - Cannot export source map\nNo API key provided. Set the ${pc.white(
                  "METRONOME_API_KEY"
                )} environment variable or ${pc.white(
                  "sourcemap: false"
                )} in the metronome plugin config`,
                { padding: 0.5, width: 80 }
              )
            )
          );

          return;
        }

        const files = [
          ...Object.entries(sourceMaps).map(([key, value]) => ({ name: key, content: value })),
          { name: "mapping.json", content: JSON.stringify(sourceMapMapping, null, 2) },
        ];

        const zip = new AdmZip();

        files.forEach((file) => {
          zip.addFile(file.name, Buffer.from(file.content));
        });

        const zipFilePath = path.join(sourceMapDirectoryPath, `${version}.zip`);
        zip.writeZip(zipFilePath);

        const uploadEndpoint = `${metronomeResolvedConfig.endpoint}/${METRONOME_METRICS_VERSION}/sourcemaps`;

        const mimetype = "text/plain";
        const blob = fileFromSync(zipFilePath, mimetype);

        console.log(pc.green(`Metronome: Uploading sourcemaps to ${uploadEndpoint}`));

        try {
          const response = await fetch(uploadEndpoint, {
            method: "POST",
            body: blob,
            redirect: "error",
            headers: {
              "x-api-key": apiKey,
              "x-version": version,
              "content-type": "application/zip",
            },
          });
          // Any 200 status code is considered a success
          if (response.status < 300 && response.status >= 200) {
            console.log(pc.green(`Metronome: Successfully uploaded sourcemaps`));
          } else {
            console.log(
              pc.red(
                boxen(
                  `Metronome: Failed to upload sourcemaps: ${response.statusText}-${response.status}`,
                  {
                    padding: 0.5,
                    width: 80,
                  }
                )
              )
            );
          }
        } catch (error) {
          console.log(
            pc.red(
              boxen(`Metronome: Failed to upload sourcemaps: ${(error as Error).message}`, {
                padding: 0.5,
                width: 80,
              })
            )
          );
        }
      }
    },
  };

  const metronomePlugin: Plugin = {
    name: "metronome",
    apply: "build",
    generateBundle(_, bundle) {
      const serverBuild = Object.entries(bundle).find(([, value]) => {
        const facadeModuleId = (value as any)?.facadeModuleId;
        return facadeModuleId?.includes("virtual:remix/server-build");
      });

      if (!serverBuild) return;

      const [name] = serverBuild;

      const file = bundle[name] as any;

      if (!version) {
        const versionRegex = /const serverManifest\s*=\s*\{[\s\S]*?"version":\s*"([a-z0-9]+)"/;
        const versionMatch = file.code.match(versionRegex) ?? [];
        version = versionMatch[1];
      }

      const packageJsonPath = path.resolve(
        __remixPluginResolvedConfig.rootDirectory,
        "package.json"
      );
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      const remixPackages = Object.fromEntries(
        Object.entries(packageJson.dependencies ?? {})
          .filter(([key]) => key.includes("@remix-run/"))
          .map(([key, value]) => [`remix.package.${key.split("/")[1]}`, value])
      ) as Record<string, string>;

      metronomeResolvedConfig = {
        ...metronomeConfig,
        remixPackages,
        endpoint: metronomeConfig?.endpoint ?? "https://metrics.metronome.sh",
        version,
        sourcemapsPath: path.join(sourceMapDirectoryPath, `${version}.zip`),
      };

      const magicString = new MagicString(file.code);

      magicString.prepend(`import { registerMetronome } from "metronome-sh/vite";\n`);

      const regex = /const routes = \{([\s\S]*?)\};/m;

      const metronome = JSON.stringify(metronomeResolvedConfig, null, 2);

      magicString.replace(regex, (match, p1) => {
        return `export const metronome = ${metronome};\nconst routes = registerMetronome({${p1}}, metronome);`;
      });

      file.code = magicString.toString();

      file.map = magicString.generateMap({ hires: true });
    },
    configResolved(config) {
      if (fs.existsSync(sourceMapDirectoryPath)) {
        fs.rmSync(sourceMapDirectoryPath, { recursive: true });
      }

      fs.mkdirSync(sourceMapDirectoryPath);

      const { root, ...rest } = config as any;

      __remixPluginResolvedConfig = rest.__remixPluginResolvedConfig;
    },
    transform(code, id) {
      if (id.match(/root\.tsx$/)) {
        const magicString = new MagicString(code);

        magicString.prepend('import { withMetronome } from "metronome-sh/react";\n');
        const defaultExportRegex = /export\sdefault/;

        magicString.replace(defaultExportRegex, "const __defaultExport =");

        magicString.append("export default withMetronome(__defaultExport);");

        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true }),
        };
      }
    },
  };

  return [metronomePlugin, ...(metronomeConfig?.sourcemap === false ? [] : [sourcemapsPlugin])];
};
