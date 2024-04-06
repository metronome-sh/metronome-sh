import { SemanticAttributes } from "./instrumentation/SemanticAttributes";
import { RegexpRouteMap, RouteMap } from "./types";
import { pathToRegexp } from "path-to-regexp";
import crypto from "node:crypto";

function getCurrentUtcHour(): number {
  const now = new Date();
  return now.getUTCHours();
}

export function obfuscate(inputObj: object): string {
  if (process.env.METRONOME_DEV) return JSON.stringify(inputObj);

  const inputStr = JSON.stringify(inputObj);
  const shift = getCurrentUtcHour();

  return inputStr
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join("");
}

export function deobfuscate<T extends object = {}>(input: string): T | undefined {
  if (process.env.METRONOME_DEV) return JSON.parse(input);

  function rotateArray(arr: number[], n: number) {
    const prevIndex = n - 1 < 0 ? arr.length - 1 : n - 1;
    const nextPart = arr.slice(n + 1).concat(arr.slice(0, prevIndex));
    return [arr[n], arr[prevIndex]].concat(nextPart);
  }

  const possibleShifts = rotateArray(
    Array.from(Array(24), (_, i) => i),
    getCurrentUtcHour()
  );

  for (const shift of possibleShifts) {
    const attempt = input
      .split("")
      .map((char) => String.fromCharCode(char.charCodeAt(0) - shift))
      .join("");
    try {
      return JSON.parse(attempt);
    } catch (e) {}
  }
  return undefined;
}

let regexpRouteMap: RegexpRouteMap;

function toRegexpRouteMap(routeMap: RouteMap) {
  if (regexpRouteMap) return regexpRouteMap;

  const entries = Object.entries(routeMap);

  regexpRouteMap = Object.fromEntries(
    entries.map(([key, value]) => {
      let route = value;
      let paths: string[] = [];
      const visited = new Set();

      while (route) {
        paths = [route.path || "", ...paths];

        if (!route.parentId || visited.has(route.parentId)) break;

        // This should never happen, but just to prevent infinite loops
        visited.add(route.parentId);

        route = routeMap[route.parentId];
      }

      // replace * with :splat*
      const regexp = pathToRegexp(paths.join("/").replace(/\*/g, ":splat*"));

      return [
        key,
        {
          ...value,
          path: paths.join("/"),
          regexp,
        },
      ];
    })
  );

  return regexpRouteMap;
}

export function getRemixAttributes({
  routeMap,
  path,
  version,
}: {
  routeMap: RouteMap;
  path: string;
  version: string;
}): {
  [SemanticAttributes.RemixRouteId]: string;
  [SemanticAttributes.RemixRoutePath]: string;
  [SemanticAttributes.AppVersion]: string;
} {
  const found = Object.values(toRegexpRouteMap(routeMap)).find(({ regexp, id }) => {
    // Skip root route
    if (id === "root") return false;

    return regexp.test(path);
  });

  if (!found)
    return {
      [SemanticAttributes.AppVersion]: version,
      [SemanticAttributes.RemixRouteId]: "<unknown>",
      [SemanticAttributes.RemixRoutePath]: "<unknown>",
    };

  return {
    [SemanticAttributes.RemixRouteId]: found.id,
    [SemanticAttributes.RemixRoutePath]: found.path ?? "<unknown>",
    [SemanticAttributes.AppVersion]: version,
  };
}

export function generateRandomBytesHex(length: number) {
  return crypto.randomBytes(length).toString("hex").toLowerCase();
}
