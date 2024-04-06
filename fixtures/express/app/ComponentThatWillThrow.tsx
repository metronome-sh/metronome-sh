import { useEffect } from "react";
import { thisThrows } from "./other-file";

export const ComponentThatWillThrow = () => {
  useEffect(() => {
    setTimeout(() => {
      thisThrows();
    }, 1000);
  }, []);

  return <div>Component that will throw</div>;
};
