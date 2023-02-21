import type { VoidFunctionComponent } from "react";

const metronomeVersion = process.env.METRONOME_VERSION;
const webVitalsPolyfill = process.env.WEB_VITALS_POLYFILL;

export type LinksProps = {
  nonce?: string;
};

export let Links: VoidFunctionComponent<LinksProps> =
  // If we're in development mode, we don't want to load the metronome script.
  process.env.NODE_ENV !== "development"
    ? () => null
    : ({ nonce }) => {
        return (
          <>
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: webVitalsPolyfill || "",
              }}
            />
            <script
              src={`/__metronome/metronome-${metronomeVersion}.js`}
              defer
              nonce={nonce}
            />
          </>
        );
      };
