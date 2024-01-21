import { AsyncLocalStorage } from "async_hooks";
import { AsyncLocalStore } from "./types";

export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStore>();
