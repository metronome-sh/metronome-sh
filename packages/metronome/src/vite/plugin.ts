import { Plugin, PluginOption } from "vite";
import MagicString from "magic-string";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import AdmZip from "adm-zip";
import fetch, { fileFromSync } from "node-fetch";
import pc from "picocolors";
import boxen from "boxen";
import childProcess from "child_process";
import { promisify } from "util";

import { METRONOME_METRICS_VERSION } from "../common/constants";
import { MetronomeConfig, MetronomeResolvedConfig } from "../common/types";

const exec = promisify(childProcess.exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceMapDirectoryPath = path.join(__dirname, "sourcemaps");

let metronomeResolvedConfig: MetronomeResolvedConfig;
let didOverrideSourcemapConfig: boolean = false;

const sourceMapMapping: Record<string, string> = {};
const sourceMaps: Record<string, string> = {};

let remixContext: any;
let version: string;
let serverBuildRan: boolean = false;
let clientBuildRan: boolean = false;

export const metronome: (metronomeConfig?: MetronomeConfig) => PluginOption = (metronomeConfig) => {
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

      const relative = path.relative(remixContext.rootDirectory, dir);

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
          const filePath = path.join(remixContext.rootDirectory, key + ".map");

          if (fs.existsSync(filePath)) {
            fs.rmSync(filePath);
          }
        });
      }

      const { dir } = options;

      const serverDir = path.join(remixContext.remixConfig.buildDirectory, "server");

      if (!clientBuildRan) {
        clientBuildRan = dir !== serverDir;
      }

      if (!serverBuildRan) {
        serverBuildRan = dir === serverDir;
      }

      if (!serverBuildRan || !clientBuildRan) return;

      const isCloudflare = Object.keys(metronomeResolvedConfig.remixPackages).some((key) => {
        return key.includes("cloudflare");
      });

      if (isCloudflare) {
        const outputDir = path.join(remixContext.rootDirectory, "wrangler");
        console.log(pc.green(`Metronome: building Cloudflare worker sourcemaps`));

        const command = `npx wrangler pages functions build --sourcemap --outdir ${outputDir} --compatibility-flags nodejs_compat`;

        const { stdout } = await exec(command, { cwd: remixContext.rootDirectory });

        const wranglerSourceMap = fs.readFileSync(path.join(outputDir, "index.js.map"), "utf-8");

        sourceMaps["wrangler.js.map"] = wranglerSourceMap;

        console.log(stdout);
      }

      const apiKey = metronomeResolvedConfig.apiKey ?? process.env.METRONOME_API_KEY;

      if (!apiKey) {
        console.log(
          pc.yellow(
            boxen(
              `Metronome - Cannot export source map\nNo API key provided. Set the ${pc.white(
                "METRONOME_API_KEY"
              )} environment variable or ${pc.white(
                "unstable_sourceMap: false"
              )} in the metronome plugin config`,
              { padding: 0.5, width: 80 }
            )
          )
        );

        return;
      }

      const routeFiles = Object.entries(remixContext.remixConfig.routes).map(
        ([key, value]) => (value as any).file
      );

      const files = [
        ...Object.entries(sourceMaps).map(([key, value]) => ({ name: key, content: value })),
        {
          name: "mapping.json",
          content: JSON.stringify(
            {
              sources: sourceMapMapping,
              routeFiles,
              wranglerMap: isCloudflare ? "wrangler.js.map" : null,
            },
            null,
            2
          ),
        },
      ];

      const zip = new AdmZip();

      files.forEach((file) => {
        zip.addFile(file.name, Buffer.from(file.content));
      });

      const zipFilePath = path.join(sourceMapDirectoryPath, `${version}.zip`);
      zip.writeZip(zipFilePath);

      const uploadEndpoint = `${metronomeResolvedConfig.endpoint}/telemetry/${METRONOME_METRICS_VERSION}/sourcemaps`;

      const mimetype = "text/plain";
      const blob = fileFromSync(zipFilePath, mimetype);

      const body = new FormData();

      body.append("file", blob, `${version}.zip`);

      console.log(pc.green(`Metronome: Uploading sourcemaps to ${uploadEndpoint}`));

      try {
        const response = await fetch(uploadEndpoint, {
          method: "POST",
          body,
          redirect: "error",
          headers: {
            "x-api-key": apiKey,
            "x-version": version,
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

      const packageJsonPath = path.resolve(remixContext.rootDirectory, "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      const remixPackages = Object.fromEntries(
        Object.entries(packageJson.dependencies ?? {})
          .filter(
            ([key]) =>
              key.includes("@remix-run/") || key.includes("react") || key.includes("react-dom")
          )
          .map(([key, value]) => {
            if (key.includes("remix")) {
              return [`package.remix.${key.split("/")[1]}`, value];
            }
            return [`package.${key}`, value];
          })
      ) as Record<string, string>;

      metronomeResolvedConfig = {
        ...metronomeConfig,
        remixPackages,
        endpoint: metronomeConfig?.endpoint ?? "https://metrics.metronome.sh",
        version,
      };

      const magicString = new MagicString(file.code);

      magicString.prepend(`import { registerMetronome } from "metronome-sh/server";`);

      const regex = /const routes = \{([\s\S]*?)\};/m;

      magicString.replace(regex, (_, p1) => {
        return `export const metronome = ${JSON.stringify(
          metronomeResolvedConfig
        )}; \n const routes = registerMetronome({${p1}}, metronome);`;
      });

      file.code = magicString.toString();

      file.map = magicString.generateMap({ hires: true, includeContent: true, source: name });
    },
    configResolved(config) {
      if (fs.existsSync(sourceMapDirectoryPath)) {
        fs.rmSync(sourceMapDirectoryPath, { recursive: true });
      }

      fs.mkdirSync(sourceMapDirectoryPath);

      const { __remixPluginContext } = config as any;

      remixContext = __remixPluginContext;
    },
    transform(code, id) {
      if (id.match(/root\.tsx$/)) {
        const magicString = new MagicString(code);

        magicString.prepend('import { withMetronome } from "metronome-sh/react";');
        const defaultExportRegex = /export\sdefault\s(function\s.*{.*\}$)/gms;

        magicString.replace(defaultExportRegex, (replacement, ...rest) => {
          const [app] = rest;
          return `export default withMetronome(${app})`;
        });

        return {
          code: magicString.toString(),
          map: magicString.generateMap({ hires: true, includeContent: true, source: id }),
        };
      }
    },
  };

  return [metronomePlugin, ...(metronomeConfig?.unstable_sourceMaps ? [sourcemapsPlugin] : [])];
};
