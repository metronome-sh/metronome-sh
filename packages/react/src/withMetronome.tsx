import { useMemo, type FunctionComponent } from "react";
import { QueueManager } from "./components/QueueManager";
import { WebAnalyticsTracker } from "./components/WebAnalyticsTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { ErrorTracker } from "./components/ErrorTracker";
import { useLoaderData } from "@remix-run/react";

export function withMetronome(App: FunctionComponent) {
  return function Metronome(props: any) {
    const data = useLoaderData();

    const doNotTrack = useMemo(() => {
      return data?.doNotTrack === true;
    }, [data?.doNotTrack]);

    if (process.env.NODE_ENV === "development") {
    }

    return process.env.NODE_ENV === "development" ? (
      <App {...props} />
    ) : (
      <>
        <QueueManager />
        <ErrorTracker />
        <WebAnalyticsTracker doNotTrack={doNotTrack} />
        <WebVitalsTracker doNotTrack={doNotTrack} />
        <App {...props} />
      </>
    );
  };
}
