import { SemanticAttributes } from "./instrumentation/SemanticAttributes";
import { RegexpRouteMap, RouteMap } from "./types";
import { pathToRegexp } from "path-to-regexp";

function getCurrentUtcHourShift(): number {
  const now = new Date();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();
  return hour + Math.floor(minute / 15);
}

export function obfuscate(inputObj: object): string {
  const inputStr = JSON.stringify(inputObj);
  const shift = getCurrentUtcHourShift();

  return inputStr
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) + shift))
    .join("");
}

export function deobfuscate<T extends object = {}>(
  input: string
): T | undefined {
  // Tolerate a drift of up to 1 hour and 15 minutes
  const possibleShifts = [] as number[];
  for (let i = 0; i <= 4; i++) {
    // Adjust 4 to the number of minute segments you use
    possibleShifts.push((getCurrentUtcHourShift() - i + 24) % 24);
  }

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
  const found = Object.values(toRegexpRouteMap(routeMap)).find(
    ({ regexp, id }) => {
      // Skip root route
      if (id === "root") return false;

      return regexp.test(path);
    }
  );

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
