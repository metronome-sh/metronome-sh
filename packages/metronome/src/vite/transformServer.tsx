import { MetronomeResolvedConfig } from "src/common/types";
import MagicString from "magic-string";
import { parse } from "@typescript-eslint/typescript-estree";
import { walk } from "./walk";

export const transformServer = ({
  code,
  id,
  config,
}: {
  code: string;
  id: string;
  config: MetronomeResolvedConfig;
}) => {
  const ast = parse(code, {
    jsx: true,
    useJSXTextNode: true,
    loc: true,
    range: true,
  });

  const magicString = new MagicString(code, { filename: id });

  const excludeFn = config.unstable_exclude?.toString() ?? "undefined";

  const excludePlaceholder = "__exclude_fn__";

  let metronomeConfig = JSON.stringify(
    { ...config, unstable_exclude: excludePlaceholder },
    null,
    2
  );

  metronomeConfig = metronomeConfig.replace(`"${excludePlaceholder}"`, excludeFn);

  magicString.prepend('import { registerMetronome } from "metronome-sh/server";\n');

  walk(ast, (node) => {
    // Find the `const routes` and wrap it
    if (node.type === "VariableDeclaration" && node.declarations.length > 0) {
      node.declarations.forEach((declaration: any) => {
        if (declaration.id && declaration.id.name === "routes" && declaration.init) {
          const [start, end] = declaration.init.range;
          magicString.overwrite(
            start,
            end,
            `registerMetronome(${code.substring(start, end)}, ${metronomeConfig})`
          );
        }
      });
    }
  });

  const serverCode = magicString.toString();

  return {
    code: serverCode,
    map: new MagicString(serverCode).generateMap({
      hires: true,
      includeContent: true,
      source: id,
      file: id,
    }),
  };
};
