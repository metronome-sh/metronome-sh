import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { onMockRequest } from "./mocks";

export const handlers = [
  http.post("https://metrics.metronome.sh/v4/process", () => {
    return new HttpResponse(null, { status: 200 });
  }),
];

export const server = setupServer(...handlers);

server.events.on("request:end", async ({ request }) => {
  if (!request.body) return onMockRequest(request.body);

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let body = "";
  let done, value;

  while (!done) {
    ({ done, value } = await reader.read());
    if (!done) {
      body += decoder.decode(value, { stream: true });
    }
  }

  body += decoder.decode();

  // Uncomment to debug
  // console.log("request:end \n", body);

  try {
    const json = JSON.parse(body);
    onMockRequest(json);
  } catch (error) {
    onMockRequest(body);
  }
});
