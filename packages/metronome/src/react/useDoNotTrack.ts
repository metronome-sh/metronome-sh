import { useState, useEffect } from "react";

type DoNotTrackOptions = {
  // doNotTrackErrors: boolean;
};

export function useDoNotTrack(): void;
export function useDoNotTrack(enable: boolean, options?: DoNotTrackOptions): void;
export function useDoNotTrack(enable?: boolean, options?: DoNotTrackOptions): void {
  useEffect(() => {
    if (enable) {
      window.__metronomeDoNotTrack = true;
    } else {
      window.__metronomeDoNotTrack = false;
    }
  }, [enable, options]);
}
