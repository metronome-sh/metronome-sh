import { type DoNotTrackOptions } from "../common/types";
import { asyncLocalStorage } from "@asyncLocalStorage";

export function doNotTrack(): void;
export function doNotTrack(enable: boolean, options?: DoNotTrackOptions): void;
export function doNotTrack(enable?: boolean, options?: DoNotTrackOptions): void {
  const store = asyncLocalStorage.getStore();

  if (store) {
    store.doNotTrack = enable ?? true;
    store.doNotTrackErrors = options?.doNotTrackErrors ?? false;
  } else {
    console.warn("Metronome: doNotTrack() called outside of a request context.");
  }
}
