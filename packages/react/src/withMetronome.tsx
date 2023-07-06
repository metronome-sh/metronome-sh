import { useMemo, type FunctionComponent } from "react";
import { QueueManager } from "./components/QueueManager";
import { PageViewTracker } from "./components/PageViewTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { ErrorTracker } from "./components/ErrorTracker";
import { useLoaderData } from "@remix-run/react";

export function withMetronome(App: FunctionComponent) {
  return function Metronome(props: any) {
    const data = useLoaderData();

    const doNotTrack = useMemo(() => {
      return data?.doNotTrack === true;
    }, [data?.doNotTrack]);

    return (
      <>
        <QueueManager />
        <ErrorTracker />
        <PageViewTracker doNotTrack={doNotTrack} />
        <WebVitalsTracker doNotTrack={doNotTrack} />
        <App {...props} />
      </>
    );
  };
}
