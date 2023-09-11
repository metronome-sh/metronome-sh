import { useMemo, type FunctionComponent } from "react";
import { QueueManager } from "./components/QueueManager";
import { WebAnalyticsTracker } from "./components/WebAnalyticsTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { ErrorTracker } from "./components/ErrorTracker";
import { useLoaderData } from "@remix-run/react";

export const withMetronome =
  process.env.NODE_ENV === "development"
    ? (App: FunctionComponent) => {
        return function Metronome(props: any) {
          <App {...props} />;
        };
      }
    : (App: FunctionComponent) => {
        return function Metronome(props: any) {
          const data = useLoaderData();

          const doNotTrack = useMemo(() => {
            return data?.doNotTrack === true;
          }, [data?.doNotTrack]);

          return (
            <>
              <QueueManager />
              <ErrorTracker />
              <WebAnalyticsTracker doNotTrack={doNotTrack} />
              <WebVitalsTracker doNotTrack={doNotTrack} />
              <App {...props} />
            </>
          );
        };
      };
