import type { PluginObj, Visitor } from "@babel/core";
import { types } from "@babel/core";
import template from "@babel/template";

export const server = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const { createRequestHandlerWrapped, importDeclarationInserted } =
          state;

        if (!createRequestHandlerWrapped || !importDeclarationInserted) {
          throw new Error("Unable to parse server.js");
        }
      },
    },

    VariableDeclaration(path, state) {
      // prettier-ignore
      if ((path.node.declarations[0]?.id as types.Identifier).name === "serverHandoff") {
        // prettier-ignore
        const importDeclaration = template("var metronome = require('metronome-sh/dist/runtime')");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    AssignmentExpression(path, state) {
      const { meta } = state.opts;

      // prettier-ignore
      if ((path.node.right as types.Identifier).name === "createRequestHandler") {
        // prettier-ignore
        const assigmentStatement = template.statement("exports.createRequestHandler = metronome.wrapCreateRequestHandler(createRequestHandler, { version: VERSION, hash: HASH });")
        path.replaceWith(assigmentStatement({
          VERSION: types.stringLiteral(meta.version),
          HASH: types.stringLiteral(meta.hash),
        }));
        state.createRequestHandlerWrapped = true;
      }
    },
  };

  return { visitor };
};

export const serverEsm = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const { createRequestHandlerWrapped, importDeclarationInserted } =
          state;

        if (!createRequestHandlerWrapped || !importDeclarationInserted) {
          throw new Error("Unable to parse server.js");
        }
      },
    },

    ImportDeclaration(path, state) {
      if (path.node.source.value === "./serverHandoff.js") {
        // prettier-ignore
        const importDeclaration = template("import { wrapCreateRequestHandler } from 'metronome-sh/dist/runtime'");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    ExportNamedDeclaration(path, state) {
      const { meta } = state.opts;
      // prettier-ignore
      if((path.node.specifiers[0] as types.ExportSpecifier).local.name === 'createRequestHandler') {
        // prettier-ignore
        const assigmentStatement =template.statement('const wrappedCreateRequestHandler = wrapCreateRequestHandler(createRequestHandler, { version: VERSION, hash: HASH });');
        const exportStatement = template.statement("export { wrappedCreateRequestHandler as createRequestHandler };")
        path.insertBefore(assigmentStatement({
          VERSION: types.stringLiteral(meta.version),
          HASH: types.stringLiteral(meta.hash),
        }));
        path.replaceWith(exportStatement());
        state.createRequestHandlerWrapped = true;
      }
    },
  };

  return { visitor };
};
