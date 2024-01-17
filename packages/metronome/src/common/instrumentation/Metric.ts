import { OtelAttribute, OtelContext } from "../types";
import crypto from "crypto";

export class Metric {
  private id: string;
  private unit: string = "";
  private type: "counter" | "gauge" | "histogram" = "counter";
  private attributes: Record<string, OtelAttribute> = {};
  private value: number = 0;
  private onRecordCallbacks: ((metric: Metric) => void)[] = [];
  private isDisposed = false;
  private timestamp: number;

  constructor(
    readonly name: string,
    options?: Partial<{
      unit?: string;
      type: "counter" | "gauge" | "histogram";
      attributes: Record<string, OtelAttribute>;
    }>
  ) {
    this.id = crypto.randomBytes(8).toString("hex").toLowerCase();
    this.unit = options?.unit ?? "";
    this.type = options?.type ?? "counter";
    this.attributes = options?.attributes ?? {};
    this.timestamp = Date.now();
  }

  public record(
    value: number,
    attributes: Record<string, OtelAttribute>
  ): Metric {
    if (this.isDisposed) {
      throw new Error("Metric is disposed, cannot record.");
    }

    this.value = value;
    this.attributes = { ...this.attributes, ...attributes };
    this.onRecordCallbacks.forEach((handler) => handler(this));
    this.onRecordCallbacks = [];

    return this;
  }

  public add(value: number, attributes: Record<string, OtelAttribute>): Metric {
    if (this.isDisposed) {
      throw new Error("Metric is disposed, cannot add.");
    }

    this.value += value;
    this.attributes = { ...this.attributes, ...attributes };
    this.onRecordCallbacks.forEach((handler) => handler(this));
    this.onRecordCallbacks = [];

    return this;
  }

  public dispose() {
    this.isDisposed = true;
    this.onRecordCallbacks = [];
  }

  public addOnRecordListener(callback: (metric: Metric) => void): void {
    this.onRecordCallbacks.push(callback);
  }

  toJson(...args: any[]) {
    return JSON.stringify(
      {
        id: this.id,
        type: this.type,
        name: this.name,
        attributes: this.attributes,
        value: this.value,
        unit: this.unit,
      },
      ...args
    );
  }

  public toObject() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      attributes: this.attributes,
      value: this.value,
      unit: this.unit,
      timestamp: this.timestamp,
    };
  }
}
