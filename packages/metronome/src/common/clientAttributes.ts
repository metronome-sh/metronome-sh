import { UAParser } from "ua-parser-js";
import { SemanticAttributes } from "./instrumentation/SemanticAttributes";

export async function getClientAttributes(headers: Headers) {
  const keyValueHeaders = Object.fromEntries(headers.entries());

  const result = await UAParser(keyValueHeaders).withClientHints();

  return {
    [SemanticAttributes.BrowserName]: result.browser.name ?? "",
    [SemanticAttributes.BrowserVersion]: result.browser.version ?? "",
    [SemanticAttributes.BrowserMajor]: result.browser.major ?? "",
    [SemanticAttributes.DeviceModel]: result.device.model ?? "",
    [SemanticAttributes.DeviceVendor]: result.device.vendor ?? "",
    [SemanticAttributes.EngineName]: result.engine.name ?? "",
    [SemanticAttributes.EngineVersion]: result.engine.version ?? "",
    [SemanticAttributes.OsName]: result.os.name ?? "",
    [SemanticAttributes.OsVersion]: result.os.version ?? "",
  };
}
