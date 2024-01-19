import "./expect";
import { server } from "./server";
import { beforeAll, afterAll, afterEach, expect, vi } from "vitest";
import { onMockRequest } from "./mocks";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  onMockRequest.mockClear();
});

vi.useFakeTimers();
vi.setSystemTime(new Date(1988, 4, 13));
