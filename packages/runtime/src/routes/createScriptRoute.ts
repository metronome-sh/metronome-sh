import type { LoaderFunction } from "@remix-run/node";

export const createScriptRoute = () => {
  const loader: LoaderFunction = async () => {
    return new Response(process.env.METRONOME_SCRIPT, {
      status: 200,
      headers: {
        "content-type": "application/javascript; charset=UTF-8",
        // TODO cache this
      },
    });
  };

  return { loader };
};
