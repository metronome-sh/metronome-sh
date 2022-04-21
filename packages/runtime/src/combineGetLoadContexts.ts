export interface GenericGetLoadContextFunction<
  T extends any[],
  R extends Record<string, any>
> {
  (...args: T): R;
}

export const combineGetLoadContexts = <
  T extends any[],
  R extends Record<string, any>
>(
  ...getLoadContexts: GenericGetLoadContextFunction<T, R>[]
): GenericGetLoadContextFunction<T, R> => {
  return (...args: T) => {
    return getLoadContexts.reduce((acc, getLoadContext) => {
      return {
        ...acc,
        ...getLoadContext(...args),
      };
    }, {} as R);
  };
};
