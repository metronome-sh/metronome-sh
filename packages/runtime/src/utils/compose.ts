export type VariadicFunction<T> = (...args: T[]) => T;

export function compose<T>(
  ...funcs: VariadicFunction<T>[]
): VariadicFunction<T> {
  return funcs.reduce(
    (a, b) =>
      (...args: T[]) =>
        a(b(...args))
  );
}
