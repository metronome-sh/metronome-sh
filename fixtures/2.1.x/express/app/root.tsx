import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from "@remix-run/react";
import { withMetronome, unstable_useDoNotTrack } from "@metronome-sh/react";
import { unstable_doNotTrack } from "@metronome-sh/express";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export function loader({ request }: LoaderFunctionArgs) {
  const search = new URLSearchParams(request.url.split("?")[1]);
  unstable_doNotTrack(search.get("dnt") === "true");

  return null;
}

function App() {
  const [params] = useSearchParams();
  unstable_useDoNotTrack(params.get("dnt") === "true");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default withMetronome(App);
