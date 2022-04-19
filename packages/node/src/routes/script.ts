import type { LoaderFunction } from "@remix-run/node";
import fs from "fs";
import path from "path";

export const loader: LoaderFunction = async ({ request }) => {
  // console.log({ request });
  const scriptPath = path.resolve(__dirname, "script/index.js");
  const script = fs.readFileSync(scriptPath, "utf8");

  return new Response(script, {
    status: 200,
    headers: {
      "content-type": "application/javascript; charset=UTF-8",
      // TODO cache this
    },
  });
};
