// Borrowed from:
// https://github.com/sergiodxa/remix-utils/blob/main/src/server/get-client-ip-address.ts
import { type Request as ExpressRequest } from "express";

const headerNames = [
  "X-Client-IP",
  "X-Forwarded-For",
  "HTTP-X-Forwarded-For",
  "Fly-Client-IP",
  "CF-Connecting-IP",
  "Fastly-Client-Ip",
  "True-Client-Ip",
  "X-Real-IP",
  "X-Cluster-Client-IP",
  "X-Forwarded",
  "Forwarded-For",
  "Forwarded",
  "DO-Connecting-IP" /** Digital ocean app platform */,
  "oxygen-buyer-ip" /** Shopify oxygen platform */,
] as const;

const isIp = (input: string): boolean => {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,7}:|(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,5}(?::[A-Fa-f0-9]{1,4}){1,2}|(?:[A-Fa-f0-9]{1,4}:){1,4}(?::[A-Fa-f0-9]{1,4}){1,3}|(?:[A-Fa-f0-9]{1,4}:){1,3}(?::[A-Fa-f0-9]{1,4}){1,4}|(?:[A-Fa-f0-9]{1,4}:){1,2}(?::[A-Fa-f0-9]{1,4}){1,5}|[A-Fa-f0-9]{1,4}:(?:(?::[A-Fa-f0-9]{1,4}){1,6})|:(?:(?::[A-Fa-f0-9]{1,4}){1,7}|:)|fe80:(?::[A-Fa-f0-9]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[A-Fa-f0-9]{1,4}:){1,4}:(?:(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipRegex.test(input);
};

function isExpressRequest(
  request: Request | ExpressRequest
): request is ExpressRequest {
  return typeof (request as ExpressRequest).originalUrl !== "undefined";
}

export function getIp(request: Request | ExpressRequest): string | null {
  const headers = request.headers;

  let ipAddress = headerNames
    .flatMap((headerName) => {
      let value: null | string | string[] | undefined;

      if (isExpressRequest(request)) {
        value = request.headers[headerName];
      } else {
        value = request.headers.get(headerName);
      }

      if (headerName === "Forwarded") {
        return parseForwardedHeader(typeof value === "string" ? value : null);
      }

      if (!value) return;

      if (typeof value === "string" && !value.includes(",")) {
        return value;
      }

      return typeof value === "string"
        ? value.split(",").map((ip) => ip.trim())
        : value;
    })
    .find((ip) => {
      if (ip === null || typeof ip === "undefined") return false;
      return isIp(ip);
    });

  return ipAddress ?? null;
}

function parseForwardedHeader(value: string | null): string | null {
  if (!value) return null;
  for (let part of value.split(";")) {
    if (part.startsWith("for=")) return part.slice(4);
    continue;
  }
  return null;
}
