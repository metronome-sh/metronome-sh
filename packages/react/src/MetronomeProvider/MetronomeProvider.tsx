import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { useLoaderData, useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { PageViewTracker } from "./components/PageViewTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { QueueManager } from "./components/QueueManager";

export type MetronomeProps = PropsWithChildren<{
  doNotTrack?: boolean;
}>;

export const MetronomeProvider: FunctionComponent<MetronomeProps> = ({
  children,
  doNotTrack = false,
}) => {
  const data = useLoaderData();

  const computedDoNotTrack = useMemo(() => {
    if (doNotTrack) return true;

    return data?.doNotTrack === true;
  }, [data?.doNotTrack]);

  return (
    <>
      <QueueManager />
      <PageViewTracker doNotTrack={computedDoNotTrack} />
      <WebVitalsTracker doNotTrack={computedDoNotTrack} />
      {children}
    </>
  );
};
