import path from "path";
import type { AppConfig } from "@remix-run/dev/config";

let noApiKeyWarningLogged = false;

export const getRemixConfig = (): AppConfig => {
  try {
    const configPath = path.resolve(process.cwd(), "./remix.config.js");
    return require(path.resolve(process.cwd(), configPath));
  } catch (e) {
    throw new Error("Could not locate remix.config.json");
  }
};

export const getApiKey = (): string | undefined => {
  const apiKey = process.env.METRONOME_API_KEY;

  if ((!apiKey && !noApiKeyWarningLogged) || noApiKeyWarningLogged) {
    // prettier-ignore
    console.log("Metronome: [Error] METRONOME_API_KEY environment variable is not set");
    noApiKeyWarningLogged = true;
  }

  return apiKey;
};

export const getRequest = (path: string): any | null => {
  // @remix/server-runtime is getting bundled in the browser
  // so we need to check for it here
  // https://github.com/remix-run/remix/issues/550
  if (typeof window !== "undefined") {
    return null;
  }

  const http = require("http");
  const https = require("https");

  const apiKey = getApiKey();

  if (!apiKey) return null;

  // prettier-ignore
  const url = process.env.METRONOME_URL ? process.env.METRONOME_URL : 'https://metronome.sh';

  const { hostname, protocol, port } = new URL(url);

  const options = {
    hostname,
    port,
    path,
    method: "POST",
    headers: { "Content-Type": "application/json", ApiKey: apiKey },
  };

  // prettier-ignore
  return protocol.startsWith('https') ? https.request(options) : http.request(options);
};
