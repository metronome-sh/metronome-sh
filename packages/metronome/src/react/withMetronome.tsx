import { MetronomeInstrumentation } from "./MetronomeInstrumentation";

export const withMetronome =
  process.env.NODE_ENV === "development"
    ? (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return <App {...props} />;
        };
      }
    : (App: () => JSX.Element) => {
        return function Metronome(props: any) {
          return (
            <>
              <MetronomeInstrumentation />
              <App {...props} />
            </>
          );
        };
      };
