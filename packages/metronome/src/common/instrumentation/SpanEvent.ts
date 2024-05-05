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

  toJSON() {
    return {
      name: this.name,
      attributes: Object.fromEntries(
        Object.entries(this.attributes).map(([key, value]) => [key, `${value}`])
      ),
      timestamp: this.timestamp,
    };
  }
}
