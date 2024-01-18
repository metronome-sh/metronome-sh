import { OtelAttribute } from "../types";

export class SpanEvent {
  protected attributes: Record<string, OtelAttribute> = {};
  protected timestamp: number;

  constructor(
    readonly name: string,
    options?: Partial<{
      attributes: Record<string, OtelAttribute>;
      timestamp?: number;
    }>
  ) {
    this.timestamp = options?.timestamp ?? Date.now();
    this.attributes = options?.attributes ?? {};
  }

  setAttribute(key: string, value: OtelAttribute): void {
    this.attributes[key] = value;
  }

  getAttributes(): Record<string, OtelAttribute> {
    return this.attributes;
  }

  getName(): string {
    return this.name;
  }

  toObject() {
    return {
      name: this.name,
      attributes: this.attributes,
      timestamp: this.timestamp,
    };
  }
}
