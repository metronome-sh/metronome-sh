import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { Links, LinksProps } from "../Links";
import { usePageViewTracker } from "./hooks";
import { useLocation } from "@remix-run/react";
import { ClientOnly } from "remix-utils";

export type MetronomeProviderProps = PropsWithChildren<{
  links?: LinksProps;
}>;

export const MetronomeProvider: FunctionComponent<MetronomeProviderProps> = ({
  children,
  links,
}) => {
  // usePageViewTracker();

  const location = useLocation();

  console.log({ location });

  return (
    <>
      <Links nonce={links?.nonce} />
      {children}
    </>
  );
};
