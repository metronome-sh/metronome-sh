import { describe, it, expect, vi, Mock } from "vitest";
import { createMetronomeMiddleware } from "../createMetronomeMiddleware";
import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
import { MetronomeInternalConfig } from "src/common/types";
import { onMockRequest } from "../../../vitest/mocks";
import { asyncLocalStorage } from "@asyncLocalStorage";

describe("createMetronomeMiddleware", () => {
  const mockReq = {
    url: "/",
    method: "GET",
    headers: { host: "localhost", "user-agent": "test-agent" },
    originalUrl: "/",
  } as unknown as ExpressRequest;

  const mockRes = {
    on: vi.fn(),
    statusCode: 200,
  } as unknown as ExpressResponse;

  const mockNext = vi.fn();

  const build: { metronome: MetronomeInternalConfig } = {
    metronome: {
      apiKey: "test-api-key",
      endpoint: "https://metrics.metronome.sh",
      remixPackages: {
        "remix.package.express": "^2.5.0",
        "remix.package.node": "^2.5.0",
        "remix.package.react": "^2.5.0",
      },
    },
  };

  it("should throw an error if build config is missing", () => {
    // prettier-ignore
    const message = "Metronome config is missing. Check the following: \n 1. Add the metronome vite plugin to your vite.config.ts \n 2. Pass the remix build to the createMetronomeMiddleware"
    expect(() => createMetronomeMiddleware(undefined)).toThrowError(message);
    expect(() => createMetronomeMiddleware({})).toThrowError(message);
  });

  it("should initialize correctly with valid build config", () => {
    const middleware = createMetronomeMiddleware(build);
    expect(middleware).toBeInstanceOf(Function);
  });

  it("should call next function immediately for /__metronome URL", () => {
    const metronomeReq = { ...mockReq, url: "/__metronome" } as ExpressRequest;
    const middleware = createMetronomeMiddleware(build);
    middleware(metronomeReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.on).not.toHaveBeenCalled();
  });

  it("should call next function immediately for HEAD requests", () => {
    const headReq = { ...mockReq, method: "HEAD" } as ExpressRequest;
    const middleware = createMetronomeMiddleware(build);
    middleware(headReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.on).not.toHaveBeenCalled();
  });

  it("instruments the request and response", async () => {
    const middleware = createMetronomeMiddleware(build);
    middleware(mockReq, mockRes, mockNext);
    expect(mockRes.on).toHaveBeenCalled();

    (mockRes.on as Mock).mock.calls[0][1]();

    await expect(onMockRequest).toHaveBeenEventuallyCalledWith([
      {
        name: "request",
        details: {
          timestamp: 579506400000,
          method: "GET",
          errored: false,
          duration: "0",
          statusCode: 200,
          pathname: "/",
          type: "document",
          startTime: "0",
          ip: "0.0.0.0.",
          ua: "test-agent",
          adapter: "express",
        },
      },
    ]);
  });

  it("should not instrument the request if doNotTrack is set", async () => {
    const getStoreSpy = vi.spyOn(asyncLocalStorage, "getStore");
    getStoreSpy.mockReturnValue({ doNotTrack: true } as any);

    const middleware = createMetronomeMiddleware(build);
    middleware(mockReq, mockRes, mockNext);

    expect(getStoreSpy).toHaveBeenCalled();
    await expect(onMockRequest).not.toHaveBeenEventuallyCalled();
  });
});
