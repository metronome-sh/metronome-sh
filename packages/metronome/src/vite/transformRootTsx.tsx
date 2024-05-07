import MagicString from "magic-string";
import { parse } from "@typescript-eslint/typescript-estree";
import { walk } from "./walk";

export function transformRootTsx({ code, id }: { code: string; id: string }) {
  const ast = parse(code, {
    jsx: true,
    useJSXTextNode: true,
    loc: true,
    range: true,
  });

  const magicString = new MagicString(code, { filename: id });

  magicString.prepend('import { withMetronome } from "metronome-sh/react";\n');

  walk(ast, (node) => {
    if (node.type === "ExportDefaultDeclaration" && node.declaration) {
      const [start, end] = node.declaration.range;
      magicString.overwrite(start, end, `withMetronome(${code.substring(start, end)});`);
    }
  });

  const rootTsx = magicString.toString();

  return {
    code: rootTsx,
    map: new MagicString(rootTsx).generateMap({
      includeContent: true,
      source: id,
      file: id,
    }),
  };
}
