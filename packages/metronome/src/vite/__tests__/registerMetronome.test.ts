import { describe, it, expect, vi } from "vitest";
import { registerMetronome } from "../../server/registerMetronome";
import { MetronomeResolvedConfig } from "../../common/types";
import * as wrapFunctionModule from "../../server/wrapRemixFunction";
import { METRONOME_REPORT_ROUTE, METRONOME_WEB_VITALS_ROUTE } from "../../common/constants";

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

    const config: MetronomeResolvedConfig = {
      apiKey: "test-api-key",
      endpoint: "https://metrics.metronome.sh",
      remixPackages: {
        "remix.package.express": "^2.5.0",
        "remix.package.node": "^2.5.0",
        "remix.package.react": "^2.5.0",
      },
      version: "abcedf",
      unstable_sourceMaps: true,
      unstable_excludeTimeout: 1000,
    };

    const result = registerMetronome(routes, config);

    expect(wrapRemixFunctionSpy).toHaveBeenCalledTimes(2);
    expect(result["/"]).toBeDefined();
    expect(result[METRONOME_REPORT_ROUTE]).toBeDefined();
    expect(result[METRONOME_REPORT_ROUTE].path).toBe(METRONOME_REPORT_ROUTE);
    expect(result[METRONOME_WEB_VITALS_ROUTE].path).toBe(METRONOME_WEB_VITALS_ROUTE);

    // Make sure the order is correct
    expect(JSON.stringify(Object.keys(result))).toBe(
      JSON.stringify([METRONOME_REPORT_ROUTE, METRONOME_WEB_VITALS_ROUTE, "/"])
    );
  });
});
