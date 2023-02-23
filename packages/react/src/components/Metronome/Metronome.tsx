import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { Links, LinksProps } from "../Links";
import { usePageViewTracker } from "./hooks";
import { useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils";

export type MetronomeProps = {
  links?: LinksProps;
};

export const Metronome: FunctionComponent<MetronomeProps> = ({ links }) => {
  // usePageViewTracker();

  return <Links nonce={links?.nonce} />;
};
