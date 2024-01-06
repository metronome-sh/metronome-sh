import { useEffect } from "react";
import { useMetronomeContext } from "../metronomeContext";

export function useDoNotTrack(condition: boolean = false) {
  const { setDoNotTrack } = useMetronomeContext();

  useEffect(() => {
    setDoNotTrack(condition);
  }, [condition]);
}
