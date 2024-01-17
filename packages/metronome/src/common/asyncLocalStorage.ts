import { AsyncLocalStorage } from "async_hooks";
import { AsyncLocalStore } from "./types";

const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStore>();

export { asyncLocalStorage };
