import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { PageViewTracker } from "./components/PageViewTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { QueueManager } from "./components/QueueManager";

export type MetronomeProps = PropsWithChildren<{
  nonce?: string;
}>;

export const MetronomeProvider: FunctionComponent<MetronomeProps> = ({
  children,
}) => {
  return (
    <>
      <QueueManager />
      <PageViewTracker />
      <WebVitalsTracker />
      {children}
    </>
  );
};
