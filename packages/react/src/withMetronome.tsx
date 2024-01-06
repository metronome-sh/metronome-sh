import { useEffect, useMemo, useRef, useState } from "react";
import { QueueManager } from "./components/QueueManager";
import { WebAnalyticsTracker } from "./components/WebAnalyticsTracker";
import { WebVitalsTracker } from "./components/WebVitalsTracker";
import { ErrorTracker } from "./components/ErrorTracker";
import { METRONOME_DEVELOPMENT } from "./constants";
import { useLocation } from "@remix-run/react";
import { MetronomeContext } from "./metronomeContext";

export const withMetronome =
  process.env.NODE_ENV === "development" && !METRONOME_DEVELOPMENT
    ? (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return <App {...props} />;
        };
      }
    : (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          // const doNotTrack = useMemo(() => {
          //   try {
          //     const cookieValue = document.cookie
          //       .split("; ")
          //       .find((row) => row.startsWith("__metronome="));

          //     const data = cookieValue
          //       ? JSON.parse(decodeURIComponent(cookieValue.split("=")[1]))
          //       : null;

          //     return data ? data.dnt : false;
          //   } catch (error) {
          //     return false;
          //   }
          // }, []);

          const [doNotTrack, setDoNotTrack] = useState(false);

          return (
            <MetronomeContext.Provider value={{ doNotTrack, setDoNotTrack }}>
              <QueueManager />
              <ErrorTracker />
              <WebAnalyticsTracker />
              <WebVitalsTracker />
              <App {...props} />
            </MetronomeContext.Provider>
          );
        };
      };
