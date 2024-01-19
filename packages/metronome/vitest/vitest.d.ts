import type { Assertion, AsymmetricMatchersContaining } from "vitest";

interface CustomMatchers<R = unknown> {
  toHaveBeenEventuallyCalled(timeout?: number): Promise<R>;
  toHaveBeenEventuallyCalledWith(...expectedArgs: any[]): Promise<R>;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
