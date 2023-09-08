import { pathToRegexp } from "path-to-regexp";
import { RouteMap, RegexpRouteMap } from "../runtime.types";

const n = 138;

const generateKeys = () => {
  const first = new Date();
  const firstKey = first.getUTCHours() + first.getUTCMinutes();

  const second = new Date();
  second.setHours(second.getHours() + 13);
  const secondKey = second.getUTCHours() + second.getUTCMinutes();

  return [firstKey, secondKey];
};

const encode = (str: string, key: number) => {
  const chars = str.split("");

  for (var i = 0; i < chars.length; i++) {
    var c = chars[i].charCodeAt(0);

    if (c <= n) {
      chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
    }
  }

  return chars.join("");
};

export const encodeObject = <T extends any>(toEncode: T) => {
  const [firstKey, secondKey] = generateKeys();
  const str = JSON.stringify(toEncode);
  return `${encode(str, firstKey)}${encode(str, secondKey)}`;
};

export const decodeObject = <T extends any>(
  toDecode: string
): T | undefined => {
  const [firstKey, secondKey] = generateKeys();
  const middle = toDecode.length / 2;
  const encoded = toDecode.slice(0, middle);
  const encoded2 = toDecode.slice(middle);

  // Try to decode the first string
  try {
    return JSON.parse(encode(encoded, n - firstKey));
  } catch (error) {}

  // Try to decode the second string
  try {
    return JSON.parse(encode(encoded2, n - secondKey));
  } catch (error) {}

  return undefined;
};

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

export function getRemixData({
  routeMap,
  path,
  hash,
}: {
  routeMap: RouteMap;
  path: string;
  hash: string;
}) {
  const found = Object.values(toRegexpRouteMap(routeMap)).find(({ regexp }) => {
    return regexp.test(path);
  });

  if (!found) return null;

  return { hash, routeId: found.id, routePath: found.path };
}
