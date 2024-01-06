import { AsyncLocalStore } from "@metronome-sh/runtime";
import { AsyncLocalStorage } from "async_hooks";

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStore>();
