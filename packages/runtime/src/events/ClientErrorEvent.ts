import { z } from "zod";
import { MetronomeEvent } from "../events";
import {
  BrowserDataSchema,
  IdentifierSchema,
  MetronomeDataSchema,
} from "./sharedSchemas";

export const ClientErrorEventSchema = z
  .object({
    timestamp: z.number(),
    error: z.object({
      message: z.string(),
      stack: z.string(),
      filename: z.string(),
      lineno: z.number(),
      colno: z.number(),
    }),
  })
  .merge(BrowserDataSchema)
  .merge(IdentifierSchema)
  .merge(MetronomeDataSchema);

export const ClientErrorIncomingEventSchema = ClientErrorEventSchema.merge(
  z.object({ name: z.literal("client-error") })
).omit({ ip: true, ua: true, version: true, adapter: true });

export class ClientErrorEvent extends MetronomeEvent<
  z.infer<typeof ClientErrorEventSchema>
> {
  public schema = ClientErrorEventSchema;

  static isIncomingClientErrorEvent(
    data: any
  ): data is z.infer<typeof ClientErrorIncomingEventSchema> {
    return ClientErrorIncomingEventSchema.safeParse(data).success;
  }

  constructor(details: z.infer<typeof ClientErrorEvent.prototype.schema>) {
    super("client-error", details);
  }
}
