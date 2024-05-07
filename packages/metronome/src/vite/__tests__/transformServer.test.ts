import { describe, expect, it } from "vitest";
import { transformServer } from "../transformServer";
import fs from "fs";
import path from "path";
import { MetronomeResolvedConfig } from "../../common/types";

describe("transformServer", () => {
  it.each(["__templates__/server.txt"])("should transform %s", (filename) => {
    const content = fs.readFileSync(path.resolve(__dirname, filename), "utf-8");

    const config: MetronomeResolvedConfig = {
      apiKey: "test-api-key",
      endpoint: "https://metrics.metronome.sh",
      remixPackages: {
        "remix.package.express": "^2.5.0",
        "remix.package.node": "^2.5.0",
        "remix.package.react": "^2.5.0",
      },
      version: "abcfed",
      unstable_sourceMaps: true,
      unstable_excludeTimeout: 1000,
      unstable_exclude: async () => {
        return true;
      },
    };

    const { code, map } = transformServer({
      code: content,
      id: filename,
      config,
    });

    expect(code).toMatchSnapshot();
    expect(map).toMatchSnapshot();
  });
});
