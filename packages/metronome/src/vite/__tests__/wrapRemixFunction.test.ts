import { describe, it, expect, vi, beforeEach } from "vitest";
import { MetronomeWrapperOptions } from "../../common/types";
import { wrapRemixFunction } from "../wrapRemixFunction";
import { json } from "@remix-run/server-runtime";
import { onMockRequest } from "../../../vitest/mocks";
import { asyncLocalStorage } from "@asyncLocalStorage";

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
  },
  assetsManifest: { version: "abcfed" },
};

describe("wrapRemixFunction", () => {
  const remixFunctionArgs = {
    request: new Request("https://metronome.sh"),
    context: {},
    params: {},
  };
  const remixFunction = vi.fn();
  const wrappedLoader = wrapRemixFunction(remixFunction, { ...wrapperOptions, type: "loader" });
  const wrappedAction = wrapRemixFunction(remixFunction, { ...wrapperOptions, type: "action" });

  beforeEach(() => {
    const hrtimeSpy = vi.spyOn(process.hrtime, "bigint");
    hrtimeSpy.mockImplementation(() => 0n);
    return () => {
      hrtimeSpy.mockRestore();
    };
  });

  it("Instruments a json response", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);
    const result = await wrappedLoader(remixFunctionArgs);
    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        name: "loader",
        details: {
          timestamp: 579506400000,
          duration: "0",
          errored: false,
          hash: "abcfed",
          ip: "0.0.0.0",
          ua: "",
          adapter: "vite",
          routeId: "test-route-id",
          routePath: "test-route-path",
          startTime: "0",
          httpPathname: "/",
          httpMethod: "GET",
          httpStatusCode: 200,
          httpStatusText: "",
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
        name: "loader",
        details: {
          timestamp: 579506400000,
          duration: "0",
          errored: false,
          hash: "abcfed",
          ip: "0.0.0.0",
          ua: "",
          adapter: "vite",
          routeId: "test-route-id",
          routePath: "test-route-path",
          startTime: "0",
          httpPathname: "/",
          httpMethod: "GET",
          httpStatusCode: 200,
          httpStatusText: "",
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
        name: "loader",
        details: {
          timestamp: 579506400000,
          duration: "0",
          errored: false,
          hash: "abcfed",
          ip: "0.0.0.0",
          ua: "",
          adapter: "vite",
          routeId: "test-route-id",
          routePath: "test-route-path",
          startTime: "0",
          httpPathname: "/",
          httpMethod: "GET",
          httpStatusCode: 500,
          httpStatusText: "",
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
    expect(remixFunction).toHaveBeenCalled();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        name: "loader",
        details: {
          timestamp: 579506400000,
          duration: "0",
          errored: true,
          hash: "abcfed",
          ip: "0.0.0.0",
          ua: "",
          adapter: "vite",
          routeId: "test-route-id",
          routePath: "test-route-path",
          startTime: "0",
          httpPathname: "/",
          httpMethod: "GET",
          httpStatusCode: 500,
          httpStatusText: "",
        },
      },
    ]);
  });

  it("Skips instrumentation if the doNotTrack flag in the storage is set to true", async () => {
    const response = json({ foo: "bar" });
    remixFunction.mockResolvedValueOnce(response);

    let result: Awaited<ReturnType<typeof wrappedLoader>> | undefined;

    await asyncLocalStorage.run({ traceId: "1", doNotTrack: true }, async () => {
      result = await wrappedLoader(remixFunctionArgs);
    });

    expect(result).toBe(response);
    expect(remixFunction).toHaveBeenCalled();
    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });

  it("Skips instrumentation if the doNotTrackErrors flag in the storage is set to true and there is an error", async () => {
    const response = new Response("test", { status: 500 });

    remixFunction.mockResolvedValueOnce(response);

    let result: Awaited<ReturnType<typeof wrappedLoader>> | undefined;

    await asyncLocalStorage.run({ traceId: "1", doNotTrack: true }, async () => {
      result = await wrappedLoader(remixFunctionArgs);
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
        name: "action",
        details: {
          timestamp: 579506400000,
          duration: "0",
          errored: false,
          hash: "abcfed",
          ip: "0.0.0.0",
          ua: "",
          adapter: "vite",
          routeId: "test-route-id",
          routePath: "test-route-path",
          startTime: "0",
          httpPathname: "/",
          httpMethod: "GET",
          httpStatusCode: 200,
          httpStatusText: "",
        },
      },
    ]);
  });
});
