import { TypedDeferredData } from "@remix-run/server-runtime";

// https://github.com/remix-run/remix/blob/973cd68528c8c58679a5b2d974ae8cefde0db455/packages/remix-server-runtime/responses.ts#L54
export function isResponse(value: any): value is Response {
  return (
    value != null &&
    typeof value.status === "number" &&
    typeof value.statusText === "string" &&
    typeof value.headers === "object" &&
    typeof value.body !== "undefined"
  );
}

export function isDeferredData(value: any): value is TypedDeferredData<any> {
  return (
    value &&
    typeof value === "object" &&
    typeof value.data === "object" &&
    typeof value.unlistenAbortSignal === "function" &&
    typeof value.controller === "object" &&
    typeof value.abortPromise === "object" &&
    typeof Array.isArray(value.valueKeys) &&
    value.subscribers instanceof Set &&
    value.pendingKeysSet instanceof Set
  );
}

export function match(input: string | RegExp, target: string): boolean {
  if (typeof input === "string") {
    return input === target;
  } else {
    return input.test(target);
  }
}
