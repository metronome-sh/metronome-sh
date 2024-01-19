import { expect, vi } from "vitest";

expect.extend({
  async toHaveBeenEventuallyCalled(received) {
    const timeout = 3000;

    const startTime = Date.now();
    let pass = false;

    while (Date.now() - startTime < timeout) {
      if (received.mock.calls.length > 0) {
        pass = true;
        break;
      }
      // Wait for a short period before retrying
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (pass) {
      return {
        message: () => `expected mock function not to have been eventually called`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected mock function to have been eventually called within ${timeout} ms`,
        pass: false,
      };
    }
  },

  async toHaveBeenEventuallyCalledWith(received, expectedArgs) {
    const timeout = 1000;

    await vi.waitFor(
      () => {
        expect(received).toHaveBeenCalledWith(expectedArgs);
      },
      { timeout }
    );

    return {
      message: () =>
        `expected mock function not to have been called with [${expectedArgs}] but it was`,
      pass: true,
    };
  },
});
