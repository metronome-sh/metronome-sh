import { beforeAll, describe, expect, it } from "vitest";
import { createClientReportRouteModule } from "../createClientReportRouteModule";
import { MetronomeInternalConfig, RouteMap } from "../../common/types";
import { ServerRouteModule } from "@remix-run/server-runtime/dist/routeModules";
import { obfuscate } from "../../common/helpers";
import { onMockRequest } from "../../../vitest/mocks";

describe("createClientReportRouteModule", () => {
  let routeModule: ServerRouteModule;

  beforeAll(() => {
    const routeMap: RouteMap = {
      root: { id: "root", parentId: void 0, path: "" },
      "routes/_index": { id: "routes/_index", parentId: "root", path: void 0 },
    };

    const assetsManifest = { version: "1.0.0" };

    const config: MetronomeInternalConfig = {
      apiKey: "test-api-key",
      endpoint: "https://metrics.metronome.sh",
      remixPackages: {
        "remix.package.express": "^2.5.0",
        "remix.package.node": "^2.5.0",
        "remix.package.react": "^2.5.0",
      },
    };

    routeModule = createClientReportRouteModule({ routeMap, assetsManifest, config });
  });

  it("should return a valid ServerRouteModule", () => {
    expect(routeModule).toBeDefined();
  });

  it("should return a Respose with status 204", async () => {
    const request = new Request("https://metronome.sh/__metronome/report", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
    });

    const response = await routeModule.action?.({ request, context: {}, params: {} });
    expect((response as Response)?.status).toBe(204);
  });

  it("should report metrics when receiving a pageview request", async () => {
    const pageview = obfuscate([
      {
        name: "pageview",
        timestamp: 1705639084440,
        pathname: "/",
        url: "http://localhost:3000/",
        hostname: "localhost",
        referrer: "",
        screen: "1512x982",
        language: "en-US",
        connection: "4g",
        deviceCategory: "desktop",
      },
    ]);

    const request = new Request("https://metronome.sh/__metronome/report", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-Forwarded-For": "127.0.0.1",
        "user-agent": "test-ua",
      },
      body: pageview,
    });

    const response = await routeModule.action?.({ request, context: {}, params: {} });

    expect((response as Response)?.status).toBe(204);

    // prettier-ignore
    const sentToMetrics = [{"name":"pageview","details":{"timestamp":579506400000,"pathname":"/","query":"","screen":"1512x982","referrer":"","hostname":"localhost","language":"en-US","connection":"4g","deviceCategory":"desktop","hash":"1.0.0","routeId":"routes/_index","routePath":"/","ip":"127.0.0.1","ua":"test-ua"}}];
    await expect(onMockRequest).toHaveBeenEventuallyCalledWith(sentToMetrics);
  });

  it("should report metrics when receiving a web vital request", async () => {
    const webVital = obfuscate([
      {
        name: "web-vital",
        timestamp: 1705647112778,
        metric: {
          id: "v3-1705647112777-8438382070669",
          name: "FCP",
          value: 145.89999997615814,
          rating: "good",
          navigationType: "reload",
        },
        pathname: "/",
        url: "http://localhost:3000/",
        hostname: "localhost",
        referrer: "",
        screen: "1512x982",
        language: "en-US",
        connection: "4g",
        deviceCategory: "desktop",
      },
    ]);

    const request = new Request("https://metronome.sh/__metronome/report", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "X-Forwarded-For": "127.0.0.1",
        "user-agent": "test-ua",
      },
      body: webVital,
    });

    const response = await routeModule.action?.({ request, context: {}, params: {} });

    expect((response as Response)?.status).toBe(204);

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        name: "web-vital",
        details: {
          timestamp: 579506400000,
          name: "FCP",
          value: 145.89999997615814,
          rating: "good",
          navigationType: "reload",
          hash: "1.0.0",
          routeId: "routes/_index",
          routePath: "/",
          ip: "127.0.0.1",
          ua: "test-ua",
          pathname: "/",
          query: "?",
          screen: "1512x982",
          referrer: "",
          hostname: "localhost",
          language: "en-US",
          connection: "4g",
          deviceCategory: "desktop",
          metric: {
            id: "v3-1705647112777-8438382070669",
            name: "FCP",
            value: 145.89999997615814,
            rating: "good",
            navigationType: "reload",
          },
        },
      },
    ]);
  });

  it.todo("should report metrics when receiving a client error request");
});
