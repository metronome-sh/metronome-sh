import { AbstractSpanExporter } from "@metronome-sh/runtime";
import { CloudflarePagesSpan } from "./CloudflarePagesSpan";

export class CloudflarePagesSpanExporter extends AbstractSpanExporter {
  private eventContext?: EventContext<any, any, any>;

  public setEventContext(eventContext: EventContext<any, any, any>) {
    this.eventContext = eventContext;
  }

  private async sendSpans(spans: CloudflarePagesSpan[]): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) return;

    if (this.getDebug()) {
      // prettier-ignore
      console.log(JSON.stringify({ spans: spans.map((span) => span.prepared()) }, null, 2));
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

  send(span: CloudflarePagesSpan | CloudflarePagesSpan[]): void {
    if (!this.eventContext) {
      throw new Error(
        "CloudflarePagesSpanExporter.send() called without a context"
      );
    }

    // @remix/server-runtime is getting bundled in the browser
    // so we need to check for it here
    // https://github.com/remix-run/remix/issues/550
    if (typeof window !== "undefined") return;

    const spans = Array.isArray(span) ? span : [span];

    this.eventContext.waitUntil(this.sendSpans(spans));
  }
}
