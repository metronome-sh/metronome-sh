import type { PluginObj, Visitor } from "@babel/core";
import { types } from "@babel/core";
import template from "@babel/template";

export const data = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const {
          callRouteActionWrapped,
          callRouteLoaderWrapped,
          importDeclarationInserted,
        } = state;

        if (
          !callRouteActionWrapped ||
          !callRouteLoaderWrapped ||
          !importDeclarationInserted
        ) {
          throw new Error("Unable to parse data.js");
        }
      },
    },

    VariableDeclaration(path, state) {
      // prettier-ignore
      if ((path.node.declarations[0]?.id as types.Identifier).name === "responses") {
        // prettier-ignore
        const importDeclaration = template("var metronome = require('metronome-sh/dist/runtime')");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    AssignmentExpression(path, state) {
      const { meta } = state.opts;
      if ((path.node.right as types.Identifier).name === "callRouteAction") {
        // prettier-ignore
        const assigmentStatement = template.statement("exports.callRouteAction = metronome.wrapCallRouteAction(callRouteAction, { version: VERSION, hash: HASH });")
        path.replaceWith(
          assigmentStatement({
            VERSION: types.stringLiteral(meta.version),
            HASH: types.stringLiteral(meta.hash),
          })
        );
        state.callRouteActionWrapped = true;
      }

      if ((path.node.right as types.Identifier).name === "callRouteLoader") {
        // prettier-ignore
        const assigmentStatement = template.statement("exports.callRouteLoader = metronome.wrapCallRouteLoader(callRouteLoader, { version: VERSION, hash: HASH });")
        path.replaceWith(
          assigmentStatement({
            VERSION: types.stringLiteral(meta.version),
            HASH: types.stringLiteral(meta.hash),
          })
        );
        state.callRouteLoaderWrapped = true;
      }
    },
  };

  return { visitor };
};

export const dataEsm = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const { callRoutesWrapped, importDeclarationInserted } = state;

        if (!callRoutesWrapped || !importDeclarationInserted) {
          throw new Error("Unable to parse data.js");
        }
      },
    },

    ImportDeclaration(path, state) {
      if (path.node.source.value === "./responses.js") {
        // prettier-ignore
        const importDeclaration = template("import { wrapCallRouteAction, wrapCallRouteLoader } from 'metronome-sh/dist/runtime'");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    ExportNamedDeclaration(path, state) {
      const { meta } = state.opts;

      // prettier-ignore
      if((path.node.specifiers[0] as types.ExportSpecifier).local.name === 'callRouteAction') {
        // prettier-ignore
        const assigmentStatement =template.statement('const wrappedCallRouteAction = wrapCallRouteAction(callRouteAction, { version: VERSION, hash: HASH });');
        const assigmentStatement2 =template.statement('const wrappedCallRouteLoader = wrapCallRouteLoader(callRouteLoader, { version: VERSION, hash: HASH });');
        const exportStatement = template.statement("export { wrappedCallRouteAction as callRouteAction, wrappedCallRouteLoader as callRouteLoader, extractData };")
        path.insertBefore(assigmentStatement({
          VERSION: types.stringLiteral(meta.version),
          HASH: types.stringLiteral(meta.hash),
        }));
        path.insertBefore(assigmentStatement2({
          VERSION: types.stringLiteral(meta.version),
          HASH: types.stringLiteral(meta.hash),
        }));
        path.replaceWith(exportStatement());
        state.callRoutesWrapped = true;
      }
    },
  };

  return { visitor };
};
