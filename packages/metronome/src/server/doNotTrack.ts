import { type DoNotTrackOptions } from "../common/types";
import { asyncLocalStorage } from "@asyncLocalStorage";

export function doNotTrack(): void;
export function doNotTrack(enable: boolean, options?: DoNotTrackOptions): void;
export function doNotTrack(enable?: boolean, options?: DoNotTrackOptions): void {
  const remixFunctionStore = asyncLocalStorage.getStore();

  if (remixFunctionStore) {
    remixFunctionStore.doNotTrack = enable ?? true;
    remixFunctionStore.doNotTrackErrors = options?.doNotTrackErrors ?? false;
  } else {
    console.warn("Metronome: doNotTrack() called outside of a request context.");
  }
}
