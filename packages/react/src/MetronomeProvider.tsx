import { FunctionComponent } from "react";
import { hash } from "./hash";
export const MetronomeProvider: FunctionComponent = ({ children }) => {
  // TODO: set context here for events occurring in react
  return (
    <>
      <script src={`/__metronome/metronome-${hash}.js`} defer />
      {children}
    </>
  );
};
