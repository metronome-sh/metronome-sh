import dayjs from "dayjs";
import { customAlphabet } from "nanoid/non-secure"; // TODO use secure nanoid in the server to replace the ids
import utc from "dayjs/plugin/utc";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  20
);

dayjs.extend(utc);

export interface SpanEvent {
  id: string;
  timestamp: number;
  attributes: Record<string, any>;
}

export enum SpanName {
  Unknown = "unknown",
  Request = "request",
  WebVital = "vital",
  Loader = "loader",
  Action = "action",
  Visit = "visit",
}

export abstract class AbstractSpan {
  public id: string;
  public traceId: string;
  private parent: AbstractSpan | undefined;
  private attributes: Record<string, any> = {};
  private events: SpanEvent[] = [];
  private timestamp: number;
  private startNano: bigint = BigInt(0);
  private endNano: bigint = BigInt(0);
  private durationNano: bigint = BigInt(0);
  private status: "ok" | "error" = "ok";

  public abstract getStartTime(): bigint;
  public abstract getEndTime(): bigint;

  constructor(
    readonly name: SpanName,
    options?: {
      attributes?: Record<string, any>;
      parent?: AbstractSpan;
      startTime?: number | bigint;
      endTime?: number | bigint;
      traceId?: string;
    }
  ) {
    const { attributes = {}, parent, startTime, traceId } = options ?? {};

    this.id = this.generateId();
    this.traceId = traceId ?? parent?.traceId ?? this.generateTraceId();
    this.timestamp = dayjs.utc().valueOf();
    // prettier-ignore
    this.startNano = startTime !== undefined ? BigInt(startTime) : this.getStartTime();
    this.attributes = attributes;
  }

  private generateId() {
    return `${this.name}_${nanoid()}`;
  }

  private generateTraceId() {
    return `${this.name}_tr_${nanoid()}`;
  }

  private generateEventId() {
    return `${this.name}_ev_${nanoid()}`;
  }

  public end(endArgs?: {
    endTime?: number | bigint;
    error?: Error;
    attributes?: Record<string, any>;
  }) {
    const { endTime, attributes, error } = endArgs ?? {};

    // prettier-ignore
    this.endNano = endTime !== undefined ? BigInt(endTime) : this.getEndTime();
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
      id: this.generateEventId(),
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
      id,
      name,
      attributes,
      events,
      parent,
      timestamp,
      startNano,
      endNano,
      durationNano,
      status,
      traceId,
    } = this;

    const parentSpanId = parent?.id ?? null;

    return {
      id,
      name,
      parentSpanId,
      traceId,
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
      id,
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
        id: id,
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
