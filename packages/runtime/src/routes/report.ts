import type { ActionFunction } from "@remix-run/server-runtime";
import { decodeObject } from "./helpers";
import { ContextWithMetronome } from "../runtime.types";
import { METRONOME_CONTEXT_KEY, METRONOME_VERSION } from "../constants";
import { ClientEventSchemaArray } from "../schemas";
import { OriginatedClientEvent } from "../OriginatedClientEvent";

export const action: ActionFunction = async ({ request, context }) => {
  const text = await request.text();

  const events = await decodeObject(text);

  const result = ClientEventSchemaArray.safeParse(events);

  if (!result.success) {
    // prettier-ignore
    console.log("Metronome: Invalid event", JSON.stringify(events), result.error);
    return new Response("", { status: 204 });
  }

  const metronomeContext = (context as ContextWithMetronome)[
    METRONOME_CONTEXT_KEY
  ];

  if (!metronomeContext) {
    return new Response("", { status: 204 });
  }

  const { adapter, exporter, ip } = metronomeContext;

  const ua = request.headers.get("User-Agent") || "";

  const identifier = { ip, ua };

  const metronome = { version: METRONOME_VERSION, adapter };

  const instances = result.data.map(
    (event) => new OriginatedClientEvent({ event, identifier, metronome })
  );

  await exporter.send(instances);

  return new Response("", { status: 204 });
};
