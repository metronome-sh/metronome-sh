import { renderHook, act } from "@testing-library/react";
import { useQueue } from "../useQueue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as helpersModule from "../../common/helpers";
import { useDoNotTrack } from "../useDoNotTrack";

const sendBeaconMock = vi.fn();

describe("useDoNotTrack", () => {
  it("should set window.__metronomeDoNotTrack to true when enable is true", () => {
    renderHook(() => useDoNotTrack(true));
    expect(window.__metronomeDoNotTrack).toBe(true);
  });

  it("should set window.__metronomeDoNotTrack to false when enable is false", () => {
    renderHook(() => useDoNotTrack(false));
    expect(window.__metronomeDoNotTrack).toBe(false);
  });
});
