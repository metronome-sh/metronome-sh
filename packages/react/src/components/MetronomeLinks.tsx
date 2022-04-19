import { VoidFunctionComponent } from "react";
import { hash } from "../hash";
export const MetronomeLinks: VoidFunctionComponent = () => {
  // Size added by polyfill 2kb for initial loading
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "__WEB_VITALS_POLYFILL__",
        }}
      />
      <script src={`/__metronome/metronome-${hash}.js`} defer />
    </>
  );
};
