import { METRONOME_WEB_VITALS } from "../common/constants";

export function loader() {
  return new Response(METRONOME_WEB_VITALS, {
    headers: {
      "content-type": "application/javascript; charset=UTF-8",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

export default undefined;
