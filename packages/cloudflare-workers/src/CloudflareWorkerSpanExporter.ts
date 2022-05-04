import { AbstractSpanExporter } from "@metronome-sh/runtime";
import { CloudflareSpan } from "./CloudflareSpan";

export class CloudflareWorkerSpanExporter extends AbstractSpanExporter {
  protected event?: FetchEvent;
  private noApiKeyWarningLogged = false;

  public setEvent(event: FetchEvent) {
    this.event = event;
  }

  private async sendSpans(spans: CloudflareSpan[]): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      if (!this.noApiKeyWarningLogged) {
        // prettier-ignore
        console.warn("No METRONOME_API_KEY environment variable set. No spans will be sent to Metronome.");
        this.noApiKeyWarningLogged = true;
      }

      return;
    }

    if (this.getDebug()) {
      // prettier-ignore
      console.debug(JSON.stringify({ spans: spans.map((span) => span.prepared()) }, null, 2));
    }
    const prepared = JSON.stringify({
      spans: spans.map((span) => span.prepared()),
    });

    await fetch(`${this.getUrl()}/insights`, {
      method: "POST",
      body: prepared,
      headers: { "Content-Type": "application/json", ApiKey: apiKey },
    });
  }

  send(span: CloudflareSpan | CloudflareSpan[]): void {
    if (!this.event) {
      // prettier-ignore
      throw new Error("CloudflareWorkerSpanExporter.send() called without an event");
    }

    // @remix/server-runtime is getting bundled in the browser
    // so we need to check for it here
    // https://github.com/remix-run/remix/issues/550
    if (typeof window !== "undefined") return;

    const spans = Array.isArray(span) ? span : [span];

    this.event.waitUntil(this.sendSpans(spans));
  }
}
