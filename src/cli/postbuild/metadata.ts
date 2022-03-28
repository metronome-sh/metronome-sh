import { getRemixConfig, getRequest } from "../../helpers";
import path from "path";
import fs from "fs";

const getMetadata = async () => {
  const remixConfig = getRemixConfig();

  const { assetsBuildDirectory = "public/build" } = remixConfig;

  const manifestFiles = fs
    .readdirSync(path.join(process.cwd(), assetsBuildDirectory))
    .filter((file) => file.startsWith("manifest-"));

  const latestManifestFile = manifestFiles
    .sort((a, b) => {
      return (
        fs.statSync(path.join(process.cwd(), assetsBuildDirectory, a)).mtimeMs -
        fs.statSync(path.join(process.cwd(), assetsBuildDirectory, b)).mtimeMs
      );
    })
    .pop();

  if (!latestManifestFile) {
    // prettier-ignore
    throw new Error("No manifest file found in build directory. Did the project build?");
  }

  (global.window as any) = {};

  try {
    await import(
      path.resolve(process.cwd(), assetsBuildDirectory, latestManifestFile)
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      "Could not locate the manifest file. Did the project build?"
    );
  }

  const { routes } = (window as any).__remixManifest;

  (global.window as any) = undefined;

  const metadataRoutes = Object.values(routes).map((route: any) => {
    const { id, path, index } = route;
    return { id, path, index };
  });

  return { routes: metadataRoutes };
};

export const uploadMetadata = async () => {
  const medatata = await getMetadata();

  const request = getRequest("/metadata");

  if (!request) {
    console.log("Metronome: [Error] Could not upload metadata.");
    return;
  }

  request.write(JSON.stringify(medatata), "utf-8");

  return new Promise<void>((resolve) => {
    request.end();

    request.on("response", (response: any) => {
      console.log("Metronome: [Info] Metadata uploaded.");
      resolve();
    });

    request.on("error", (error: any) => {
      // prettier-ignore
      console.log(`Metronome: [Error] Could not upload metadata. [${error?.code}]`);
      resolve();
    });
  });

  console.log({ medatata });
};
