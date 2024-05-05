import { beforeAll, describe, expect, it } from "vitest";
import { createClientReportRouteModule } from "../../server/createClientReportRouteModule";
import { MetronomeResolvedConfig, RouteMap } from "../../common/types";
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
    };

    routeModule = createClientReportRouteModule({ routeMap, config });
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

    const sentToMetrics = [
      {
        id: expect.any(String),
        name: "pageview",
        timestamp: 579506400000,
        type: "counter",
        unit: "",
        value: 1,
        attributes: {
          "app.hostname": "localhost",
          "app.version": "abcedf",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "127.0.0.1",
          "client.connection": "4g",
          "client.device_category": "desktop",
          "client.language": "en-US",
          "client.referrer": "",
          "client.screen": "1512x982",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.pathname": "/",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "routes/_index",
          "remix.route_path": "/",
          "url.query": "",
          "user_agent.original": "test-ua",
        },
      },
    ];
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
        id: expect.any(String),
        name: "FCP",
        timestamp: 579506400000,
        type: "histogram",
        unit: "",
        value: 145.89999997615814,
        attributes: {
          "app.hostname": "localhost",
          "app.version": "abcedf",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "127.0.0.1",
          "client.connection": "4g",
          "client.device_category": "desktop",
          "client.language": "en-US",
          "client.referrer": "",
          "client.screen": "1512x982",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.pathname": "/",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "routes/_index",
          "remix.route_path": "/",
          "url.full": "http://localhost:3000/",
          "user_agent.original": "test-ua",
          "web_vital.name": "FCP",
          "web_vital.navigation_type": "reload",
          "web_vital.rating": "good",
        },
      },
    ]);
  });

  it("should report metrics when receiving a client error request", async () => {
    const error = obfuscate([
      {
        name: "client-error",
        timestamp: 1714717516580,
        error: {
          name: "Error",
          message: "Uncaught Error: throwMe1714717516579",
          filename: "http://localhost:3005/assets/error-client-378hSy1e.js?client-route=1",
          lineno: 1,
          colno: 73,
          stack:
            "Error: throwMe1714717516579\n    at o (http://localhost:3005/assets/error-client-378hSy1e.js?client-route=1:1:73)\n    at r (http://localhost:3005/assets/error-client-378hSy1e.js?client-route=1:1:144)\n    at http://localhost:3005/assets/error-client-378hSy1e.js?client-route=1:1:283",
        },
        pathname: "/",
        url: "http://localhost:3005/error-client",
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
      body: error,
    });

    const response = await routeModule.action?.({ request, context: {}, params: {} });

    expect((response as Response)?.status).toBe(204);

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        attributes: {
          "app.version": "abcedf",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "127.0.0.1",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "routes/_index",
          "remix.route_path": "/",
          "user_agent.original": "test-ua",
        },
        context: {
          traceId: expect.any(String),
        },
        endTime: 579506400000,
        events: [
          {
            attributes: {
              "exception.colno": "73",
              "exception.escaped": "false",
              "exception.filename":
                "http://localhost:3005/assets/error-client-378hSy1e.js?client-route=1",
              "exception.lineno": "1",
              "exception.message": "Uncaught Error: throwMe1714717516579",
              "exception.stacktrace": expect.any(String),
              "exception.type": "Error",
            },
            name: "exception",
            timestamp: 1714717516580,
          },
        ],
        id: expect.any(String),
        kind: 2,
        name: "client_error",
        startTime: 579506400000,
      },
    ]);
  });
});
