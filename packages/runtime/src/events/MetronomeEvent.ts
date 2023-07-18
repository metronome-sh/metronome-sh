import { z } from "zod";

export abstract class MetronomeEvent<T extends Record<string, any>> {
  protected name: string;
  public details: T;

  abstract schema: z.ZodSchema<T>;

  constructor(name: string, details: T) {
    this.name = name;
    this.details = details;
  }

  public toJSON() {
    return { name: this.name, details: this.details };
  }

  public update(details: Partial<T>) {
    this.details = { name: this.name, ...this.details, ...details };
  }

  public get isValid() {
    return this.schema.safeParse(this.details).success;
  }
}
