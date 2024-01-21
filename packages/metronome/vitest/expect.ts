import { expect, vi } from "vitest";

expect.extend({
  async toHaveBeenEventuallyCalled(received) {
    const { isNot } = this;
    const timeout = 2000;
    let pass = false;
    try {
      await vi.waitUntil(() => received.mock.calls.length, { timeout });
      pass = true;
    } catch (error) {
      pass = false;
    }

    return {
      pass,
      message: () => `expected mock function ${isNot ? "not " : ""}to have been called`,
    };
  },

  async toHaveBeenEventuallyCalledWith(received, ...expectedArgs) {
    const timeout = 2000;
    const { equals } = this;

    let pass = true;

    try {
      await vi.waitUntil(
        () => {
          return (
            received.mock.calls.length &&
            received.mock.calls.some((args) => equals(args, expectedArgs))
          );
        },
        { timeout }
      );
    } catch (error) {
      pass = false;
    }

    return {
      pass,
      message: () =>
        `Expected function to have been called with ${typeof expectedArgs} but it was not.`,
      actual: received.mock.calls.length === 1 ? received.mock.calls[0][0] : undefined,
      expected: expectedArgs.length === 1 ? expectedArgs[0] : expectedArgs,
    };
  },
});
