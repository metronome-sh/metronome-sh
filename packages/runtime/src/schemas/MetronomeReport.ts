import { object, array } from "superstruct";

import { WebVital } from "./WebVital";

export const MetronomeReport = object({
  webVitals: array(WebVital),
});
