import type { PluginObj, Visitor, types } from "@babel/core";
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
      // prettier-ignore
      if ((path.node.right as types.Identifier).name === "createRequestHandler") {
        // prettier-ignore
        const assigmentStatement = template.statement("exports.createRequestHandler = metronome.wrapCreateRequestHandler(createRequestHandler);")
        path.replaceWith(assigmentStatement());
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
      // prettier-ignore
      if((path.node.specifiers[0] as types.ExportSpecifier).local.name === 'createRequestHandler') {
        // prettier-ignore
        const assigmentStatement =template.statement('const wrappedCreateRequestHandler = wrapCreateRequestHandler(createRequestHandler);');
        const exportStatement = template.statement("export { wrappedCreateRequestHandler as createRequestHandler };")
        path.insertBefore(assigmentStatement());
        path.replaceWith(exportStatement());
        state.createRequestHandlerWrapped = true;
      }
    },
  };

  return { visitor };
};
