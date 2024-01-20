import "./expect";
import { server } from "./server";
import { beforeAll, afterAll, afterEach, expect, vi, beforeEach } from "vitest";
import { onMockRequest } from "./mocks";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(1988, 4, 13));
});
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  onMockRequest.mockClear();
});
