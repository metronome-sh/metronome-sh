import { context } from "esbuild";
import {
  reactConfig,
  viteConfig,
  serverConfig,
  expressConfig,
  asyncStorageConfig,
} from "./esbuild.mjs";

const reactContext = await context(reactConfig);
const viteContext = await context(viteConfig);
const serverContext = await context(serverConfig);
const expressContext = await context(expressConfig);
const asyncStorageContext = await context(asyncStorageConfig);

await Promise.all([
  reactContext.rebuild(),
  viteContext.rebuild(),
  serverContext.rebuild(),
  expressContext.rebuild(),
  asyncStorageContext.rebuild(),
]);

await Promise.all([
  viteContext.watch(),
  reactContext.watch(),
  serverContext.watch(),
  expressContext.watch(),
  asyncStorageContext.watch(),
]);

console.log(" 👀 Watching for changes...");
