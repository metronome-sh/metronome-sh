import { parse } from "@typescript-eslint/typescript-estree";
import fs from "fs";
import MagicString from "magic-string";
import { walk } from "./walk";

export function generateExcludeFunction({
  configFile,
}: {
  configFile: string | undefined;
}): string {
  if (!configFile) {
    return `
      export default function metronomeExcludeFunction() {
        console.log('Vite config file was not found. Skipping exclude function.');
        return false;
      }
    `;
  }

  const importsUsed = new Set<string>();

  const code = fs.readFileSync(configFile, "utf8");

  const ast = parse(code, {
    jsx: false,
    loc: true,
    range: true,
    comment: true,
    tokens: true,
  });

  // function extractIdentifiers(node: any) {
  //   if (node.type === "Identifier") {
  //     importsUsed.add(node.name);
  //   } else if (node.type === "MemberExpression" && node.object.type === "Identifier") {
  //     importsUsed.add(node.object.name);
  //   }
  //   Object.keys(node).forEach((key) => {
  //     const value = node[key];
  //     if (typeof value === "object" && value !== null) {
  //       extractIdentifiers(value);
  //     }
  //   });
  // }

  let excludeFnContent = "";
  let functionDefined = false;

  // const walk = (node: any, parent?: any) => {

  //   console.log()

  //   if (node.type === "ImportDeclaration") {
  //     console.log({ node });

  //     node.specifiers.forEach((specifier: any) => {
  //       console.log({ import: specifier.local.name });
  //       if (specifier.local && importsUsed.has(specifier.local.name)) {
  //         const [start, end] = node.range;
  //         excludeFnContent += code.substring(start, end) + "\n";
  //       }
  //     });
  //   } else if (node.type === "CallExpression" && node.callee.name === "metronome") {
  //     node.arguments.forEach((arg: any) => {
  //       if (arg.type === "ObjectExpression") {
  //         arg.properties.forEach((prop: any) => {
  //           if (prop.key.name === "unstable_exclude" && prop.value) {
  //             const [start, end] = prop.value.range;
  //             excludeFnContent += `export default ${code.substring(start, end)};\n`;
  //             extractIdentifiers(prop.value);
  //             functionDefined = true;
  //           }
  //         });
  //       }
  //     });
  //   }
  // };

  walk(ast, (node) => {
    if (node.type === "ImportDeclaration") {
      const [start, end] = node.range;

      console.log(code.substring(start, end));
    }
  });

  // If unstable_exclude is not defined, create a default export function that returns false.
  if (!functionDefined) {
    excludeFnContent += "export default function metronomeExcludeFunction() { return false; };\n";
  }

  return excludeFnContent;
}
