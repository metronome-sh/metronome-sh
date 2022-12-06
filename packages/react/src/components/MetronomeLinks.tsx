import type { VoidFunctionComponent } from "react";

const metronomeVersion = "__METRONOME_VERSION__";
const webVitalsPolyfill = "__WEB_VITALS_POLYFILL__";

export type MetronomeLinksProps = {
  nonce?: string;
}

// Scripts adds a 2kb for initial loading.
export const MetronomeLinks: VoidFunctionComponent<MetronomeLinksProps> =
  process.env.NODE_ENV === "development"
    ? () => null
    : ({ nonce }) => {
        return (
          <>
            <script
              nonce={nonce}
              dangerouslySetInnerHTML={{
                __html: webVitalsPolyfill,
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
