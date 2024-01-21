import { describe, it, expect, vi } from "vitest";
import { registerMetronome } from "../registerMetronome";
import { MetronomeInternalConfig } from "../../common/types";
import * as wrapFunctionModule from "../wrapRemixFunction";

describe("registerMetronome", () => {
  it("should register the metronome routes", () => {
    const wrapRemixFunctionSpy = vi.spyOn(wrapFunctionModule, "wrapRemixFunction");

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

    const result = registerMetronome(routes, assetsManifest, config);

    expect(wrapRemixFunctionSpy).toHaveBeenCalledTimes(2);
    expect(result["/"]).toBeDefined();
    expect(result["__metronome"]).toBeDefined();
    expect(result["__metronome"].path).toBe("__metronome");
    expect(result["__metronome/web-vitals.$version"].path).toBe("__metronome/web-vitals/:version");
  });
});
