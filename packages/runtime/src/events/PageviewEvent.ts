import { z } from "zod";
import { MetronomeEvent } from "../events";
import {
  BrowserDataSchema,
  IdentifierSchema,
  MetronomeDataSchema,
} from "./sharedSchemas";

export const PageviewEventSchema = z
  .object({
    timestamp: z.number(),
  })
  .merge(BrowserDataSchema)
  .merge(IdentifierSchema)
  .merge(MetronomeDataSchema);

export const PageviewIncomingEventSchema = PageviewEventSchema.merge(
  z.object({ name: z.literal("pageview") })
).omit({ ip: true, ua: true, version: true, adapter: true });

export class PageviewEvent extends MetronomeEvent<
  z.infer<typeof PageviewEventSchema>
> {
  public schema = PageviewEventSchema;

  static isIncomingPageviewEvent(
    data: any
  ): data is z.infer<typeof PageviewIncomingEventSchema> {
    return PageviewIncomingEventSchema.safeParse(data).success;
  }

  constructor(details: z.infer<typeof PageviewEvent.prototype.schema>) {
    super("pageview", details);
  }
}
