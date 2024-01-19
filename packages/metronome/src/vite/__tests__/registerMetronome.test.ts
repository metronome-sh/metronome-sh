import { test, vi } from "vitest";
import { registerMetronome } from "../registerMetronome";
import { MetronomeInternalConfig } from "../../common/types";
import * as wrapRemixFunctionModule from "../wrapRemixFunction";
test("registerMetronome", ({ expect }) => {
  const routes = {
    "/": {
      id: "/",
      parentId: undefined,
      path: "/",
      module: {
        action: () => null,
        loader: () => null,
        default: undefined,
      },
    },
  };

  const assetsManifest = { version: "abcdef" };

  const config: MetronomeInternalConfig = {
    apiKey: "test-api-key",
    endpoint: "https://metronome.sh",
    remixPackages: {},
  };

  const spy = vi.spyOn(wrapRemixFunctionModule, "wrapRemixFunction");

  const result = registerMetronome(routes, assetsManifest, config);

  expect(result["/"]).toBeDefined();
  // Make sure they're wrapped
  expect(result["/"].module.loader).not.toBe(routes["/"].module.loader);
  expect(result["/"].module.action).not.toBe(routes["/"].module.action);
  expect(result["__metronome"]).toBeDefined();
  expect(result["__metronome"].path).toBe("__metronome");

  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenCalledWith(routes["/"].module.loader, {
    type: "loader",
    routeId: "/",
    routePath: "/",
    config,
    assetsManifest,
  });
  expect(spy).toHaveBeenCalledWith(routes["/"].module.action, {
    type: "action",
    routeId: "/",
    routePath: "/",
    config,
    assetsManifest,
  });
});
