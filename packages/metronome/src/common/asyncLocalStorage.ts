import { AsyncLocalStorage } from "node:async_hooks";
import { AsyncLocalStore } from "./types";

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStore>();
