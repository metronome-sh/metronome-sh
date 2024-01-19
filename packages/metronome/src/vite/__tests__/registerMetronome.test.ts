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
  expect(result["__metronome"]).toBeDefined();
  expect(result["__metronome"].path).toBe("__metronome");
});
