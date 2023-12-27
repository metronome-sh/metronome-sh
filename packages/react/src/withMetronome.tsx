import { useMemo, type FunctionComponent } from "react";
import { QueueManager } from "./components/QueueManager";
import { WebAnalyticsTracker } from "./components/WebAnalyticsTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { ErrorTracker } from "./components/ErrorTracker";
import { useLoaderData } from "@remix-run/react";
import { METRONOME_DEVELOPMENT } from "./constants";

export const withMetronome =
  process.env.NODE_ENV === "development" && !METRONOME_DEVELOPMENT
    ? (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return <App {...props} />;
        };
      }
    : (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          const data = useLoaderData<any>();

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
