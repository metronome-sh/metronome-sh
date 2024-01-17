import { OtelAttribute, OtelContext } from "../types";
import crypto from "crypto";
import { SpanEvent } from "./SpanEvent";

export class Span {
  private id: string;
  private attributes: Record<string, OtelAttribute> = {};
  private events: SpanEvent[] = [];
  private context: OtelContext = { traceId: "" };
  private onEndCallbacks: ((span: Span) => void)[] = [];

  constructor(
    readonly name: string,
    options?: Partial<{
      attributes: Record<string, OtelAttribute>;
      context: Partial<OtelContext>;
    }>
  ) {
    this.id = crypto.randomBytes(8).toString("hex").toLowerCase();
    this.attributes = options?.attributes ?? {};

    const traceId =
      options?.context?.traceId ??
      crypto.randomBytes(16).toString("hex").toLowerCase();

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
    this.onEndCallbacks.forEach((handler) => handler(this));
    this.onEndCallbacks = [];
  }

  public addOnEndListener(callback: (span: Span) => void): void {
    this.onEndCallbacks.push(callback);
  }

  public getContext(): OtelContext {
    return this.context;
  }

  public addEvent(
    name: string,
    attributes: Record<string, OtelAttribute>,
    timestamp?: number
  ) {
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

  toJson(...args: any[]): string {
    return JSON.stringify(
      {
        id: this.id,
        name: this.name,
        attributes: this.attributes,
        events: this.events.map((event) => ({
          name: event.getName(),
          attributes: event.getAttributes(),
        })),
        context: this.context,
      },
      ...args
    );
  }
}
