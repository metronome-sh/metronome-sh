import { getRemixConfig, getRequest } from "../../helpers";
import path from "path";

const getMetadata = async () => {
  const remixConfig = getRemixConfig();
  const { serverBuildDirectory } = remixConfig;

  if (!serverBuildDirectory) {
    throw new Error("Could not determine serverBuildDirectory in Remix config");
  }

  let assets;

  try {
    assets = await import(path.resolve(serverBuildDirectory, "./assets.json"));
  } catch (error) {
    throw new Error("Could not locate assets.json. Did the project build?");
  }

  const { routes } = assets;

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
