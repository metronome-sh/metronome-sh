import type { PluginObj, Visitor, types } from "@babel/core";
import template from "@babel/template";

export const browser = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const { importDeclarationInserted, useMetronomeHookInserted } = state;
        if (!importDeclarationInserted || !useMetronomeHookInserted) {
          throw new Error("Unable to parse browser.js");
        }
      },
    },

    VariableDeclaration(path, state) {
      // prettier-ignore
      if ((path.node.declarations[0]?.id as types.Identifier).name === "components") {
        // prettier-ignore
        const importDeclaration = template("var metronome = require('metronome-sh')");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    CallExpression(path, state) {
      if (
        !state.useMetronomeHookInserted &&
        // prettier-ignore
        ((path.node.callee as types.MemberExpression).property as types.Identifier)?.name === "useRef"
      ) {
        // prettier-ignore
        const useMetronomeTemplate = template("metronome.useMetronome()");
        path.parentPath.parentPath?.insertAfter(useMetronomeTemplate());
        state.useMetronomeHookInserted = true;
      }
    },
  };

  return { visitor };
};

export const browserEsm = (): PluginObj<any> => {
  const visitor: Visitor<any> = {
    Program: {
      exit(_, state) {
        const { importDeclarationInserted, useMetronomeHookInserted } = state;
        if (!importDeclarationInserted || !useMetronomeHookInserted) {
          throw new Error("Unable to parse browser.js");
        }
      },
    },

    ImportDeclaration(path, state) {
      if (path.node.source.value === "./components.js") {
        // prettier-ignore
        const importDeclaration = template("import { useMetronome } from 'metronome-sh'");
        path.insertAfter(importDeclaration());
        state.importDeclarationInserted = true;
      }
    },

    CallExpression(path, state) {
      if (
        !state.useMetronomeHookInserted &&
        // prettier-ignore
        ((path.node.callee as types.MemberExpression).property as types.Identifier)?.name === "useRef"
      ) {
        // prettier-ignore
        const useMetronomeTemplate = template("useMetronome()");
        path.parentPath.parentPath?.insertAfter(useMetronomeTemplate());
        state.useMetronomeHookInserted = true;
      }
    },
  };

  return { visitor };
};
