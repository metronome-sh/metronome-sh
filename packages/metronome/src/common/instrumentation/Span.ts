import { generateRandomBytesHex } from "../helpers/generateRandomBytesHex";
import { OtelAttribute, OtelContext } from "../types";
import { SpanEvent } from "./SpanEvent";

const kind = {
  server: 1,
  client: 2,
  producer: 3,
  consumer: 4,
  internal: 5,
} as const;

type Kind = keyof typeof kind;

export type SpanOptions = Partial<{
  kind: Kind;
  timestamp: number;
  startTime: number;
  attributes: Record<string, OtelAttribute>;
  context: Partial<OtelContext>;
}>;

export class Span {
  private id: string;
  private attributes: Record<string, OtelAttribute> = {};
  private startTime: number;
  private endTime: number;
  private events: SpanEvent[] = [];
  private context: OtelContext = { traceId: "" };
  private onEndCallbacks: ((span: Span) => void)[] = [];
  private kind: Kind;

  constructor(readonly name: string, options?: SpanOptions) {
    this.id = generateRandomBytesHex(8);
    this.attributes = options?.attributes ?? {};
    this.startTime = options?.startTime ?? Date.now();
    this.endTime = this.startTime;
    const traceId = options?.context?.traceId ?? generateRandomBytesHex(16);

    this.kind = options?.kind ?? "internal";

    this.context.traceId = traceId;
  }

  public setAttribute(key: string, value?: OtelAttribute): void {
    if (value === undefined) return;

    this.attributes[key] = value;
  }

  public setAttributes(attributes: Record<string, OtelAttribute>): void {
    this.attributes = { ...this.attributes, ...attributes };
  }

  end() {
    this.endTime = Date.now();
    this.onEndCallbacks.forEach((handler) => handler(this));
    this.onEndCallbacks = [];
  }

  public addOnEndListener(callback: (span: Span) => void): void {
    this.onEndCallbacks.push(callback);
  }

  public getContext(): OtelContext {
    return this.context;
  }

  public addEvent(name: string, attributes: Record<string, OtelAttribute>, timestamp?: number) {
    this.events.push(new SpanEvent(name, { attributes, timestamp }));
  }

  public recordException(exception: {
    code?: string | number;
    name?: string;
    message?: string;
    stack?: string;
  }): void {
    const event = new SpanEvent("exception");

    if (exception.code) {
      event.setAttribute("exception.code", exception.code);
    }

    if (exception.name) {
      event.setAttribute("exception.type", exception.name);
    }

    if (exception.message) {
      event.setAttribute("exception.message", exception.message);
    }

    if (exception.stack) {
      event.setAttribute("exception.stacktrace", exception.stack);
    }

    this.events.push(event);
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      attributes: this.attributes,
      events: this.events,
      context: this.context,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      kind: kind[this.kind],
      // Convert all the attributes to string
      attributes: Object.fromEntries(
        Object.entries(this.attributes).map(([key, value]) => [key, `${value}`])
      ),
      events: this.events,
      context: this.context,
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }
}
