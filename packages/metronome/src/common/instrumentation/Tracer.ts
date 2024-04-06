import { MetronomeResolvedConfig, OtelAttribute } from "../types";
import { Metric } from "./Metric";
import { MetricExporter } from "./MetricExporter";
import { Span, SpanOptions } from "./Span";
import { SpanExporter } from "./SpanExporter";

let tracerInstance: Tracer;

export class Tracer {
  protected spanExporter: SpanExporter;
  protected metricExporter: MetricExporter;

  constructor(options: { spanExporter: SpanExporter; metricExporter: MetricExporter }) {
    this.spanExporter = options.spanExporter;
    this.metricExporter = options.metricExporter;
  }

  public async flush(): Promise<void> {
    await Promise.all([this.spanExporter.flush(), this.metricExporter.flush()]);
  }

  public startActiveSpan<T>(
    name: string,
    options: { traceId?: string; attributes?: Record<string, OtelAttribute> },
    callback: (span: Span) => T
  ): T | Promise<T> {
    const span = new Span(name, {
      attributes: options?.attributes,
      context: { traceId: options?.traceId },
      kind: "server",
    });

    span.addOnEndListener(() => this.exportSpan(span));

    return callback(span);
  }

  public startSpan(name: string, options?: SpanOptions) {
    const span = new Span(name, options);
    span.addOnEndListener(() => this.exportSpan(span));
    return span;
  }

  public createHistogram(
    name: string,
    options?: { attributes?: Record<string, OtelAttribute>; id?: string }
  ) {
    const metric = new Metric(name, {
      type: "histogram",
      ...(options ?? {}),
    });
    metric.addOnRecordListener(() => this.exportMetric(metric));
    return metric;
  }

  public createCounter(
    name: string,
    options?: { attributes?: Record<string, OtelAttribute>; id?: string }
  ) {
    const metric = new Metric(name, { type: "counter", ...(options ?? {}) });
    metric.addOnRecordListener(() => this.exportMetric(metric));
    return metric;
  }

  private exportSpan(span: Span): void {
    this.spanExporter.export(span);
  }

  private exportMetric(metric: Metric): void {
    this.metricExporter.export(metric);
  }
}

export function tracer() {
  if (!tracerInstance) {
    throw new Error("Tracer not initialized");
  }

  return tracerInstance;
}

export function startInstrumentation(config: MetronomeResolvedConfig) {
  if (tracerInstance) return;

  tracerInstance = new Tracer({
    spanExporter: new SpanExporter(config),
    metricExporter: new MetricExporter(config),
  });
}
