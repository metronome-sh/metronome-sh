import { describe, it, expect, vi, beforeAll } from "vitest";
import { MetronomeWrapperOptions } from "../../common/types";
import { wrapRemixFunction } from "../../server/wrapRemixFunction";
import { json } from "@remix-run/server-runtime";
import { onMockRequest } from "../../../vitest/mocks";
import { asyncLocalStorage } from "@asyncLocalStorage";

describe("wrapRemixFunction", () => {
  const wrapperOptions: Omit<MetronomeWrapperOptions, "type"> = {
    routeId: "test-route-id",
    routePath: "test-route-path",
    config: {
      apiKey: "test-api-key",
      endpoint: "https://metrics.metronome.sh",
      remixPackages: {
        "remix.package.express": "^2.5.0",
        "remix.package.node": "^2.5.0",
        "remix.package.react": "^2.5.0",
      },
      version: "abcfed",
      unstable_sourceMaps: true,
    },
  };

  // header with user agent
  const headers = new Headers();
  headers.set("user-agent", "test-user-agent");

  const remixFunctionArgs = {
    request: new Request("https://metronome.sh", { headers }),
    context: {},
    params: {},
  };
  const remixFunction = vi.fn();
  const wrappedLoader = wrapRemixFunction(remixFunction, { ...wrapperOptions, type: "loader" });
  const wrappedAction = wrapRemixFunction(remixFunction, { ...wrapperOptions, type: "action" });

  it("Instruments a json response", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);
    const result = await wrappedLoader(remixFunctionArgs);
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        endTime: 579506400000,
        events: [],
        id: expect.any(String),
        kind: 1,
        name: "loader",
        startTime: 579506400000,
        context: {
          traceId: expect.any(String),
        },
        attributes: {
          "app.version": "abcfed",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "0.0.0.0",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.method": "GET",
          "http.pathname": "/",
          "http.status_code": "200",
          "metronome.adapter": "vite",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.function": "loader",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "test-route-id",
          "remix.route_path": "test-route-path",
          "url.full": "https://metronome.sh/",
          "user_agent.original": "test-user-agent",
        },
      },
    ]);
  });

  it("Instruments a defer response", async () => {
    const response = new Response("test");
    remixFunction.mockResolvedValueOnce(response);
    const result = await wrappedLoader(remixFunctionArgs);
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        endTime: 579506400000,
        events: [],
        id: expect.any(String),
        kind: 1,
        name: "loader",
        startTime: 579506400000,
        context: {
          traceId: expect.any(String),
        },
        attributes: {
          "app.version": "abcfed",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "0.0.0.0",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.method": "GET",
          "http.pathname": "/",
          "http.status_code": "200",
          "metronome.adapter": "vite",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.function": "loader",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "test-route-id",
          "remix.route_path": "test-route-path",
          "url.full": "https://metronome.sh/",
          "user_agent.original": "test-user-agent",
        },
      },
    ]);
  });

  it("Instruments an error response", async () => {
    const response = new Response("test", { status: 500 });
    remixFunction.mockResolvedValueOnce(response);
    const result = await wrappedLoader(remixFunctionArgs);
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        endTime: 579506400000,
        events: [],
        id: expect.any(String),
        kind: 1,
        name: "loader",
        startTime: 579506400000,
        context: {
          traceId: expect.any(String),
        },
        attributes: {
          "app.version": "abcfed",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "0.0.0.0",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.method": "GET",
          "http.pathname": "/",
          "http.status_code": "500",
          "metronome.adapter": "vite",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.function": "loader",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "test-route-id",
          "remix.route_path": "test-route-path",
          "url.full": "https://metronome.sh/",
          "user_agent.original": "test-user-agent",
        },
      },
    ]);
  });

  it("Skips instrumentation if the pathname is /healthcheck and no ignoredPathnames were specified in config", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);

    const wrapped = wrapRemixFunction(remixFunction, {
      ...wrapperOptions,
      routeId: "test-route-id",
      config: { ...wrapperOptions.config },
      type: "loader",
    });

    const result = await wrapped({
      ...remixFunctionArgs,
      request: new Request("https://metronome.sh/healthcheck"),
    });
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Skips instrumentation if the request method is HEAD", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);

    const wrapped = wrapRemixFunction(remixFunction, {
      ...wrapperOptions,
      routeId: "test-route-id",
      config: { ...wrapperOptions.config },
      type: "loader",
    });

    const result = await wrapped({
      ...remixFunctionArgs,
      request: new Request("https://metronome.sh/healthcheck", { method: "HEAD" }),
    });
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Instruments /healthcheck if ignoredPathnames is declared in config", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);

    const wrapped = wrapRemixFunction(remixFunction, {
      ...wrapperOptions,
      routeId: "test-route-id",
      config: { ...wrapperOptions.config, ignoredPathnames: ["/ignored"] },
      type: "loader",
    });

    const result = await wrapped({
      ...remixFunctionArgs,
      request: new Request("https://metronome.sh/healthcheck"),
    });
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalled();
  });

  it("Skips instrumentation if the route is in the ignoredPathnames", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);

    const wrapped = wrapRemixFunction(remixFunction, {
      ...wrapperOptions,
      routeId: "test-route-id",
      config: { ...wrapperOptions.config, ignoredPathnames: ["/ignored"] },
      type: "loader",
    });

    const result = await wrapped({
      ...remixFunctionArgs,
      request: new Request("https://metronome.sh/ignored"),
    });
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Skips instrumentation if the routeId is in the ignoredRoutes", async () => {
    const response = json({ foo: "bar" });
    const wrapped = wrapRemixFunction(remixFunction, {
      ...wrapperOptions,
      routeId: "ignored.$id",
      config: { ...wrapperOptions.config, ignoredRoutes: ["ignored.$id"] },
      type: "loader",
    });

    remixFunction.mockResolvedValueOnce(response);
    const result = await wrapped({
      ...remixFunctionArgs,
      request: new Request("https://metronome.sh/ignored/123"),
    });
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Instruments errors ocurreed inside the function", async () => {
    const error = new Error("test-error");
    remixFunction.mockRejectedValueOnce(error);
    expect(() => wrappedLoader(remixFunctionArgs)).rejects.toThrowError(error);

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        endTime: 579506400050,
        events: [
          {
            name: "exception",
            timestamp: 579506400050,
            attributes: {
              "exception.message": "test-error",
              "exception.stacktrace": error.stack,
              "exception.type": "Error",
            },
          },
        ],
        id: expect.any(String),
        kind: 1,
        name: "loader",
        startTime: 579506400050,
        context: {
          traceId: expect.any(String),
        },
        attributes: {
          "app.errored": "true",
          "app.version": "abcfed",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "0.0.0.0",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "error.type": "Error",
          "http.method": "GET",
          "http.pathname": "/",
          "metronome.adapter": "vite",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.function": "loader",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "test-route-id",
          "remix.route_path": "test-route-path",
          "url.full": "https://metronome.sh/",
          "user_agent.original": "test-user-agent",
        },
      },
    ]);
  });

  it("Skips instrumentation if the doNotTrack flag in the storage is set to true", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockImplementationOnce(() => {
      const remixFunctionStore = asyncLocalStorage.getStore();
      if (remixFunctionStore) {
        remixFunctionStore.doNotTrack = true;
      }
      return response;
    });

    let result: Awaited<ReturnType<typeof wrappedLoader>> | undefined;

    await asyncLocalStorage.run({ traceId: "" }, async () => {
      result = await wrappedLoader(remixFunctionArgs);

      const doNotTrack = asyncLocalStorage.getStore()?.doNotTrack;

      expect(doNotTrack).toBe(true);
    });

    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();
    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Skips instrumentation if the doNotTrackErrors flag in the storage is set to true and there is an error", async () => {
    const response = new Response("test", { status: 500 });

    remixFunction.mockImplementationOnce(() => {
      const remixFunctionStore = asyncLocalStorage.getStore();
      if (remixFunctionStore) {
        remixFunctionStore.doNotTrack = true;
        remixFunctionStore.doNotTrackErrors = true;
      }
      return response;
    });

    let result: Awaited<ReturnType<typeof wrappedLoader>> | undefined;

    await asyncLocalStorage.run({ traceId: "1" }, async () => {
      result = await wrappedLoader(remixFunctionArgs);

      const doNotTrack = asyncLocalStorage.getStore()?.doNotTrack;
      const doNotTrackErrors = asyncLocalStorage.getStore()?.doNotTrackErrors;

      // Check for bubble up of the doNotTrack and doNotTrackErrors flags
      expect(doNotTrack).toBe(true);
      expect(doNotTrackErrors).toBe(true);
    });

    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();
    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it('Instruments with the "action" event name', async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);
    const result = await wrappedAction(remixFunctionArgs);
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        endTime: 579506400000,
        events: [],
        id: expect.any(String),
        kind: 1,
        name: "action",
        startTime: 579506400000,
        context: {
          traceId: expect.any(String),
        },
        attributes: {
          "app.version": "abcfed",
          "browser.major": "",
          "browser.name": "",
          "browser.version": "",
          "client.address": "0.0.0.0",
          "device.model": "",
          "device.vendor": "",
          "engine.name": "",
          "engine.version": "",
          "http.method": "GET",
          "http.pathname": "/",
          "http.status_code": "200",
          "metronome.adapter": "vite",
          "metronome.version": "undefined",
          "os.name": "",
          "os.version": "",
          "remix.function": "action",
          "remix.package.express": "^2.5.0",
          "remix.package.node": "^2.5.0",
          "remix.package.react": "^2.5.0",
          "remix.route_id": "test-route-id",
          "remix.route_path": "test-route-path",
          "url.full": "https://metronome.sh/",
          "user_agent.original": "test-user-agent",
        },
      },
    ]);
  });
});
