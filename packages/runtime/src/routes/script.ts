import type { LoaderFunction } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async () => {
  return new Response(process.env.METRONOME_SCRIPT, {
    status: 200,
    headers: {
      "content-type": "application/javascript; charset=UTF-8",
      "cache-control": "max-age=31536000, immutable",
    },
  });
};
