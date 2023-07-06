import type { AppLoadContext } from "@remix-run/server-runtime";

// import {GetLoadContextFunction}
export interface GenericGetLoadContextFunction<
  T extends any[],
  R extends Record<string, any> | undefined
> {
  (...args: T): R;
}

// TODO fix the typings
export function combineGetLoadContexts<
  F extends (...args: any[]) => Promise<AppLoadContext>
>(...getLoadContexts: any[]): (...args: any[]) => Promise<AppLoadContext> {
  async function combinedGeLoadContexts(...args: any[]) {
    return await getLoadContexts.reduce(async (acc, getLoadContext) => {
      return { ...acc, ...(await getLoadContext(...args)) };
    }, {} as AppLoadContext);
  }

  return combinedGeLoadContexts;
}
