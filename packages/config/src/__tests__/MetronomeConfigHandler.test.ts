import { describe, it, expect } from "vitest";
import { MetronomeConfigHandler } from "../MetronomeConfigHandler";

describe.concurrent("MetronomeConfigHandler", () => {
  it("loads the default config if nothing was passed", async () => {
    const config = new MetronomeConfigHandler();
    expect(config.config).toBeDefined();
  });

  it.each([
    ["root", [], false],
    [2, [], false],
    ["root", ["root"], true],
    ["root", [/root/], true],
    ["rooting", [/root/], true],
    ["root", ["root", "routes/test"], true],
    ["root", [/root/, "routes/test"], true],
    ["routes/ignored.$id", ["/routes/ignored.$id"], true],
    ["routes/ignored.$id", ["routes/ignored.$id"], true],
    ["routes/ignored.$id", ["ignored.$id"], true],
  ])(
    "Should handle %s route correctly with ignoredRoutes as %j",
    async (route, ignoredRoutes, ignored) => {
      const config = new MetronomeConfigHandler({ ignoredRoutes });
      expect(config.shouldIgnoreRoute(route as any)).toBe(ignored);
    }
  );

  it.each([
    [undefined, [], false],
    ["/", [], false],
    ["/", ["/"], true],
    ["/__metronome", [], true],
    ["/healthcheck", ["/healthcheck"], true],
    ["/projects/1/settings", ["/projects/1/settings"], true],
    ["/projects/1/settings", ["/projects/2/settings"], false],
    ["/projects/1/settings", [/\/projects\/\d+\/settings/], true],
    ["/projects/1/settings", [/\/projects\/([1-2])\/settings/], true],
    ["/projects/1/settings", [/projects/], true],
    ["/projects/3/settings", [/\/projects\/([1-2])\/settings/], false],
  ])(
    "Should handle %s path correctly with ignoredPathnames as %j",
    async (pathname, ignoredPathnames, ignored) => {
      const config = new MetronomeConfigHandler({ ignoredPathnames });
      expect(config.shouldIgnorePath(pathname as any)).toBe(ignored);
    }
  );

  it("Should ignore head requests if ignoreHeadMethod is true", async () => {
    const config = new MetronomeConfigHandler({ ignoreHeadMethod: true });
    expect(config.shouldIgnoreMethod()).toBe(false);
    expect(config.shouldIgnoreMethod("head")).toBe(true);
    expect(config.shouldIgnoreMethod("Head")).toBe(true);
    expect(config.shouldIgnoreMethod("HEAD")).toBe(true);
  });

  it("Should not ignore head requests if ignoreHeadMethod is false", async () => {
    const config = new MetronomeConfigHandler({ ignoreHeadMethod: false });
    expect(config.shouldIgnoreMethod()).toBe(false);
    expect(config.shouldIgnoreMethod("head")).toBe(false);
    expect(config.shouldIgnoreMethod("Head")).toBe(false);
    expect(config.shouldIgnoreMethod("HEAD")).toBe(false);
  });
});
