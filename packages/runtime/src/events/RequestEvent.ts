import { z } from "zod";
import { IdentifierSchema, MetronomeDataSchema } from "./sharedSchemas";
import { MetronomeEvent } from "./MetronomeEvent";

export const RequestEventSchema = z
  .object({
    hash: z.string(),
    timestamp: z.number(),
    startTime: z.bigint(),
    duration: z.bigint(),
    errored: z.boolean(),
    method: z.string(),
    statusCode: z.number(),
    pathname: z.string(),
    type: z.enum(["data", "document"]),
  })
  .merge(MetronomeDataSchema)
  .merge(IdentifierSchema);

export class RequestEvent extends MetronomeEvent<
  z.infer<typeof RequestEventSchema>
> {
  public schema = RequestEventSchema;

  constructor(details: z.infer<typeof RequestEventSchema>) {
    super("request", details);
  }
}
