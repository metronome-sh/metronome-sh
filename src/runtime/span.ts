import cuid from "cuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DeviceDetector from "device-detector-js";

dayjs.extend(utc);

type Event = {
  id: string;
  timestamp: number;
  attributes: Record<string, any>;
};

export const PARENT_SPAN_CONTEXT_KEY = "METRONOME_PARENT_SPAN";

export class Span {
  private _id: string;
  private name: string;
  private attributes: Record<string, any> = {};
  private events: Event[] = [];
  private parent: Span | undefined;
  private timestamp: number;
  private startNano: bigint;
  private endNano: bigint = BigInt(0);
  private durationNano: bigint = BigInt(0);
  private status: "ok" | "error" = "ok";
  private _traceId: string;

  // private start:
  constructor(
    name: string,
    options?: {
      attributes?: Record<string, any>;
      parent?: Span;
      startTime?: number | bigint;
      traceId?: string;
    }
  ) {
    const { attributes = {}, parent, startTime, traceId } = options ?? {};

    this._id = cuid();
    this.name = name;
    this.attributes = attributes;
    this.parent = parent;
    this.timestamp = dayjs.utc().valueOf();
    // prettier-ignore
    this.startNano = startTime !== undefined ? BigInt(startTime) : process.hrtime.bigint();

    this._traceId = traceId ? traceId : parent ? parent.traceId : cuid();
  }

  get id() {
    return this._id;
  }

  get traceId() {
    return this._traceId;
  }

  public end(endTime?: number | bigint) {
    // prettier-ignore
    this.endNano = endTime !== undefined ? BigInt(endTime) : process.hrtime.bigint();
    this.durationNano = this.endNano - this.startNano;

    return this;
  }

  public setAttribute(key: string, value: any) {
    this.attributes[key] = value;

    return this;
  }

  public setAttributes(attributes: Record<string, any>) {
    this.attributes = { ...this.attributes, ...attributes };

    return this;
  }

  public event(attributes: Record<string, any>) {
    const event = {
      id: cuid(),
      timestamp: dayjs.utc().valueOf(),
      attributes,
    };

    this.events = [...this.events, event];
    return this;
  }

  public recordException(error: Error, attributes?: Record<string, any>) {
    this.status = "error";
    this.event({
      name: error.name,
      message: error.message,
      ...(attributes ? attributes : {}),
    });

    return this;
  }

  public prepared() {
    const {
      _id,
      name,
      attributes,
      events,
      parent,
      timestamp,
      startNano,
      endNano,
      durationNano,
      status,
      _traceId,
    } = this;

    const parentSpanId = parent?.id ?? null;

    return {
      id: _id,
      name,
      parentSpanId,
      traceId: _traceId,
      attributes,
      events,
      timestamp,
      startNano: startNano.toString(),
      endNano: endNano.toString(),
      durationNano: durationNano.toString(),
      status,
    };
  }

  public toJson() {
    const {
      _id,
      name,
      attributes,
      events,
      parent,
      timestamp,
      startNano,
      endNano,
      durationNano,
      status,
    } = this;

    const parentSpanId = parent?.id ?? null;

    return JSON.stringify(
      {
        id: _id,
        name,
        parentSpanId,
        attributes,
        events,
        timestamp,
        startNano,
        endNano,
        durationNano,
        status,
      },
      (_, value) => {
        return typeof value === "bigint" ? value.toString() : value;
      }
    );
  }
}

export const createRequestSpan = (request: Request) => {
  const attributes = {
    "remix.request.type": "document",
    "http.url": request.url,
    "http.method": request.method,
  };

  return new Span("request", { attributes });
};

export const createLoaderSpan = ({
  routeId,
  request,
  context,
}: {
  routeId: string;
  request: Request;
  context: any;
}) => {
  const parent: Span | undefined = context[PARENT_SPAN_CONTEXT_KEY];

  const attributes = {
    "remix.function": "loader",
    "remix.route": routeId,
  };

  return new Span("loader", { attributes, parent });
};

export const createActionSpan = ({
  routeId,
  request,
  context,
}: {
  routeId: string;
  request: Request;
  context: any;
}) => {
  const parent: Span | undefined = context[PARENT_SPAN_CONTEXT_KEY];

  const attributes = {
    "remix.function": "action",
    "remix.route": routeId,
  };

  return new Span("action", { attributes, parent });
};

export const createWebVitalSpan = async (request: Request) => {
  const cloned = request.clone();
  const json = await cloned.json();

  const { connection, metric } = json;
  const { name, value, id, delta } = metric;

  const userAgent = cloned.headers.get("User-Agent") || "";

  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(userAgent);

  const categoryMap = {
    desktop: "desktop",
    smartphone: "mobile",
    tablet: "mobile",
    unknown: "unknown",
  };

  const attributes = {
    "vital.name": name,
    "vital.value": value,
    "vital.id": id,
    "vital.delta": delta,
    "device.ua": userAgent,
    "device.client.name": device.client?.name || "unknown",
    "device.client.version": device.client?.version || "unknown",
    // prettier-ignore
    "device.category": categoryMap[(device.device?.type as unknown as keyof typeof categoryMap) || "unknown"] || "unknown",
    "device.type": device.device?.type || "unknown",
    "device.brand": device.device?.brand || "unknown",
    "device.connection": connection || "unknown",
  };

  return new Span("vital", { attributes, startTime: 0 }).end(0);
};

export const endSpan = (span: Span, response: Response) => {
  return span
    .setAttributes({
      "http.status.code": response.status,
      "http.status.text": response.statusText,
    })
    .end();
};

export const endSpanWithError = (span: Span, error: Error) => {
  return span
    .setAttributes({
      "internal.error": true,
      "http.status.code": 500,
    })
    .recordException(error)
    .end();
};
