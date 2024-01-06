import { asyncLocalStorage } from "./asyncLocalStorage";

export function doNotTrack(conditional: () => Promise<boolean>): Promise<void>;
export function doNotTrack(conditional?: boolean): void;
export function doNotTrack(
  conditional: boolean | (() => Promise<boolean>) = true
): void | Promise<void> {
  const store = asyncLocalStorage.getStore();

  if (!store) {
    console.warn(
      "dotNotTrack was called outside of a request context. This will not have any effect."
    );
    return;
  }

  if (typeof conditional === "function") {
    return conditional().then((result) => {
      store.doNotTrack = result;
    });
  } else {
    store.doNotTrack = conditional;
  }
}
