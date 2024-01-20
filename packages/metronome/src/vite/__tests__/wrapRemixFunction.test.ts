import { describe, it, expect, vi, beforeEach } from "vitest";
import { MetronomeWrapperOptions } from "../../common/types";
import { wrapRemixFunction } from "../wrapRemixFunction";
import { json } from "@remix-run/server-runtime";
import { onMockRequest } from "../../../vitest/mocks";

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

  describe("loader", () => {
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
  });

  describe("action", () => {
    it("Instruments a json response", async () => {
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

    it("Instruments a defer response", async () => {
      const response = new Response("test");
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

    it("Instruments an error response", async () => {
      const response = new Response("test", { status: 500 });
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
            httpStatusCode: 500,
            httpStatusText: "",
          },
        },
      ]);
    });

    it("Instruments errors ocurreed inside the function", async () => {
      const error = new Error("test-error");
      remixFunction.mockRejectedValueOnce(error);
      expect(() => wrappedAction(remixFunctionArgs)).rejects.toThrowError(error);
      expect(remixFunction).toHaveBeenCalled();

      await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
        {
          name: "action",
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
  });
});
