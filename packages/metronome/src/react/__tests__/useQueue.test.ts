import { renderHook, act } from "@testing-library/react";
import { useQueue } from "../useQueue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as helpersModule from "../../common/helpers";

const sendBeaconMock = vi.fn();

describe("useQueue", () => {
  beforeEach(() => {
    const obfuscateSpy = vi.spyOn(helpersModule, "obfuscate");
    obfuscateSpy.mockImplementation((queue) => JSON.stringify(queue));
    navigator.sendBeacon = sendBeaconMock;

    return () => {
      obfuscateSpy.mockRestore();
      sendBeaconMock.mockClear();
    };
  });

  it("should call send beacon when data gets enqueued and time has passed", async () => {
    const { result } = renderHook(() => useQueue());

    act(() => {
      result.current.enqueue({ name: "test", timestamp: 0 });
    });

    vi.advanceTimersToNextTimer();

    await expect(sendBeaconMock).toHaveBeenEventuallyCalledWith(
      "/__metronome",
      '[{"name":"test","timestamp":0}]'
    );
  });

  it("should call send beacon on visibilitychange", async () => {
    const { result } = renderHook(() => useQueue());

    act(() => {
      result.current.enqueue({ name: "test", timestamp: 0 });
    });

    const visibilityStateSpy = vi
      .spyOn(document, "visibilityState", "get")
      .mockReturnValue("hidden");
    window.dispatchEvent(new Event("visibilitychange"));
    visibilityStateSpy.mockRestore();

    await expect(sendBeaconMock).toHaveBeenEventuallyCalledWith(
      "/__metronome",
      '[{"name":"test","timestamp":0}]'
    );
  });

  it("should call send beacon on pagehide", async () => {
    const { result } = renderHook(() => useQueue());

    act(() => {
      result.current.enqueue({ name: "test", timestamp: 0 });
    });

    window.dispatchEvent(new Event("pagehide"));

    await expect(sendBeaconMock).toHaveBeenEventuallyCalledWith(
      "/__metronome",
      '[{"name":"test","timestamp":0}]'
    );
  });

  it("should call send beacon on beforeunload", async () => {
    const { result } = renderHook(() => useQueue());

    act(() => {
      result.current.enqueue({ name: "test", timestamp: 0 });
    });

    window.dispatchEvent(new Event("beforeunload"));

    await expect(sendBeaconMock).toHaveBeenEventuallyCalledWith(
      "/__metronome",
      '[{"name":"test","timestamp":0}]'
    );
  });
});
