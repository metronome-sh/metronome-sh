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
    await vi.waitUntil(
      () => {
        return (
          received.mock.calls.length &&
          received.mock.calls.some((args) => equals(args, expectedArgs))
        );
      },
      { timeout }
    );

    return {
      pass: true,
      message: () => `Expected function to have been called with ${expectedArgs} but it was not.`,
      actual: received,
      expected: expectedArgs,
    };
  },
});
