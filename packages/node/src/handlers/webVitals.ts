import { Span } from "../transport/span";
import DeviceDetector, { DeviceDetectorResult } from "device-detector-js";
import { sendSpans } from "../transport/exporter";
import { Meta } from "../types";

const getDeviceCategory = (result?: DeviceDetectorResult) => {
  if (!result?.device?.type) return "unknown";

  switch (result.device.type) {
    case "desktop":
      return "desktop";
    case "tablet":
    case "smartphone":
      return "mobile";
    default:
      return "unknown";
  }
};

export const handleWebVitalsRequest = async (
  request: Request,
  meta: Meta
): Promise<Response> => {
  const cloned = request.clone();
  const json = await cloned.json();

  // FOREARCH HERE
  const spans = json.map((data: any) => {
    const { connection, metric, routeId, routePath, pathname } = data;
    const { name, value, id, delta } = metric;

    const userAgent = cloned.headers.get("User-Agent") || "";

    const detector = new DeviceDetector();
    const result = detector.parse(userAgent);

    const attributes = {
      "device.ua": userAgent,
      "device.client.name": result.client?.name || "unknown",
      "device.client.version": result.client?.version || "unknown",
      "device.category": getDeviceCategory(result),
      "device.type": result.device?.type || "unknown",
      "device.brand": result.device?.brand || "unknown",
      "device.connection": connection || "unknown",
      "remix.route.id": routeId,
      "remix.route.path": routePath,
      "remix.pathname": pathname,
      "vital.name": name,
      "vital.value": value,
      "vital.id": id,
      "vital.delta": delta,
      "app.version": meta.version,
      "app.hash": meta.hash,
      "metronome.version": meta.metronomeVersion,
    };

    return new Span("vital", { attributes, startTime: 0 }).end({ endTime: 0 });
  }) as Span[];

  await sendSpans(spans);

  return new Response("", { status: 204 });
};
