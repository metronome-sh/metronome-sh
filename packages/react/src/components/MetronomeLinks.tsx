import { VoidFunctionComponent } from "react";

const metronomeVersion = "__METRONOME_VERSION__";
const webVitalsPolyfill = "__WEB_VITALS_POLYFILL__";

// Scripts adds a 2kb for initial loading.
export const MetronomeLinks: VoidFunctionComponent =
  process.env.NODE_ENV === "development"
    ? () => null
    : () => {
        return (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: webVitalsPolyfill,
              }}
            />
            <script
              src={`/__metronome/metronome-${metronomeVersion}.js`}
              defer
            />
          </>
        );
      };
