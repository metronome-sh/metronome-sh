import { z } from "zod";
import {
  BrowserDataSchema,
  IdentifierSchema,
  MetronomeDataSchema,
  RemixDataSchema,
} from "./sharedSchemas";
import { MetronomeEvent } from "../events";

export const NavigateAwayEventSchema = z
  .object({
    timestamp: z.number(),
  })
  .merge(BrowserDataSchema)
  .merge(RemixDataSchema)
  .merge(IdentifierSchema)
  .merge(MetronomeDataSchema);

export const NavigateAwayIncomingEventSchema = NavigateAwayEventSchema.merge(
  z.object({ name: z.literal("navigate-away") })
).omit({ ip: true, ua: true, version: true, adapter: true });

export class NavigateAwayEvent extends MetronomeEvent<
  z.infer<typeof NavigateAwayEventSchema>
> {
  public schema = NavigateAwayEventSchema;

  static isIncomingNavigateAwayEvent(
    data: any
  ): data is z.infer<typeof NavigateAwayIncomingEventSchema> {
    return NavigateAwayIncomingEventSchema.safeParse(data).success;
  }

  constructor(details: z.infer<typeof NavigateAwayEvent.prototype.schema>) {
    super("navigate-away", details);
  }
}
