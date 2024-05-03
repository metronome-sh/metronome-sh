import "./expect";
import { server } from "./server";
import { beforeAll, afterAll, afterEach, vi, beforeEach } from "vitest";
import { onMockRequest } from "./mocks";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  vi.useFakeTimers({
    shouldAdvanceTime: false,
    toFake: [
      "setTimeout",
      "clearTimeout",
      "setImmediate",
      "clearImmediate",
      "setInterval",
      "clearInterval",
      "Date",
      "performance",
    ],
    now: new Date(1988, 4, 13),
  });

  vi.setSystemTime(new Date(1988, 4, 13));

  const hrtimeSpy = vi.spyOn(process.hrtime, "bigint");
  hrtimeSpy.mockImplementation(() => 0n);
  return () => {
    hrtimeSpy.mockRestore();
  };
});
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  onMockRequest.mockClear();
});
