import { describe, expect, it } from "vitest";
import { transformRootTsx } from "../transformRootTsx";
import fs from "fs";
import path from "path";
describe("transformRootTsx", () => {
  it.each([
    "__templates__/simple-root.txt",
    "__templates__/default-template-root.txt",
    "__templates__/complex-root.txt",
  ])("should transform %s", (filename) => {
    const content = fs.readFileSync(path.resolve(__dirname, filename), "utf-8");

    const { code, map } = transformRootTsx({
      code: content,
      id: filename,
    });

    expect(code).toMatchSnapshot();
    expect(map).toMatchSnapshot();
  });
});
