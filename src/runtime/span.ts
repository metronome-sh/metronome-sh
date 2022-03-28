import cuid from "cuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
      endTime?: number | bigint;
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

  public end(endArgs?: {
    endTime?: number | bigint;
    error?: Error;
    attributes?: Record<string, any>;
  }) {
    const { endTime, attributes, error } = endArgs ?? {};

    // prettier-ignore
    this.endNano = endTime !== undefined ? BigInt(endTime) : process.hrtime.bigint();
    this.durationNano = this.endNano - this.startNano;

    if (attributes) {
      this.setAttributes(attributes);
    }

    if (error) {
      this.setAttributes({
        "internal.error": true,
        "http.status.code": 500,
      }).recordException(error);
    }

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
