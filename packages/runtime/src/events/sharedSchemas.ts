import { z } from "zod";

export const BrowserDataSchema = z.object({
  pathname: z.string(),
  query: z.string(),
  screen: z.string(),
  referrer: z.string(),
  hostname: z.string(),
  language: z.string(),
  connection: z.string(),
  deviceCategory: z.string(),
});

export const RemixDataSchema = z.object({
  hash: z.string(),
  routeId: z.string(),
  routePath: z.string().optional(),
});

export const IdentifierSchema = z.object({
  ip: z.string(),
  ua: z.string(),
});

export const MetronomeDataSchema = z.object({
  version: z.string(),
  adapter: z.string(),
});
