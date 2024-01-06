import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import { MetronomeContextValue } from "./metronome.types";

export const MetronomeContext = createContext({
  doNotTrack: false,
  setDoNotTrack: (value: boolean) => {},
});

export function useMetronomeContext() {
  return useContext(MetronomeContext);
}
