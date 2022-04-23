import type { ActionFunction, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return { test: true };
};

export const action: ActionFunction = () => {
  return { anotherTest: true };
};
