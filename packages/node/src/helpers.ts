import path from "path";
import type { AppConfig } from "@remix-run/dev/config";
import type { IncomingMessage } from "http";
import invariant from "ts-invariant";
import type { ServerBuild } from "@remix-run/node";
import type { ProjectMeta } from "./types";

const { version } = require(path.resolve(process.cwd(), "package.json"));
const { version: metronomeVersion } = require("../package.json");

let noApiKeyWarningLogged = false;

export const isInternalRequest = (request: IncomingMessage): boolean => {
  invariant(request.url, "request.url is required");
  invariant(request.method, "request.method is required");

  return (
    Boolean(request.url.match(/__metronome/)) &&
    request.method.toLowerCase() === "post"
  );
};

export const getRequestType = (
  request: IncomingMessage
): "data" | "document" => {
  invariant(request.url, "request.url is required");

  const url = new URL(
    request.url || "/",
    `http://${request.headers.host || "localhost"}`
  );

  return url.searchParams.has("_data") ? "data" : "document";
};

export const getProjectMeta = (build: ServerBuild): ProjectMeta => {
  const { version: hash } = build.assets;
  return { hash, metronomeVersion, version };
};

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
