import { z } from "zod";
import { IdentifierSchema, MetronomeDataSchema, MetronomeEvent } from ".";

export const RemixFunctionEventSchema = z
  .object({
    timestamp: z.number(),
    startTime: z.bigint().nullable(),
    duration: z.bigint(),
    errored: z.boolean(),
    httpMethod: z.string(),
    httpStatusCode: z.number(),
    httpStatusText: z.string(),
    httpPathname: z.string(),
  })
  .merge(IdentifierSchema)
  .merge(MetronomeDataSchema);

type RemixFunctionData = z.infer<typeof RemixFunctionEventSchema>;

export abstract class RemixFunctionEvent extends MetronomeEvent<RemixFunctionData> {
  public schema = RemixFunctionEventSchema;

  protected abstract now(): bigint;

  end() {
    this.update({
      duration: this.now() - this.details.startTime!,
    });
  }

  constructor(
    name: "loader" | "action",
    details: Omit<RemixFunctionData, "startTime">
  ) {
    super(name, { ...details, startTime: null });
    this.update({ startTime: this.now() });
  }
}
