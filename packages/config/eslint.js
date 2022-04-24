module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb-typescript",
    "prettier",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-throw-literal": "off",
    curly: "error",
    "import/no-import-module-exports": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": "off",
  },
};
