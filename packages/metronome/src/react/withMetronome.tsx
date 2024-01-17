// import { useMemo, type FunctionComponent } from "react";
// import { QueueManager } from "./components/QueueManager";
// import { WebAnalyticsTracker } from "./components/WebAnalyticsTracker";
// import { WebVitalsTracker } from "./components/WebVitalsTracker";
// import { ErrorTracker } from "./components/ErrorTracker";
// import { useLoaderData } from "@remix-run/react";
// import { METRONOME_DEVELOPMENT } from "../constants";

import { MetronomeInstrumentation } from "./MetronomeInstrumentation";

export const withMetronome =
  process.env.NODE_ENV === "development"
    ? (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return <App {...props} />;
        };
      }
    : (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return (
            <>
              <MetronomeInstrumentation />
              <App {...props} />
            </>
          );
        };
      };
