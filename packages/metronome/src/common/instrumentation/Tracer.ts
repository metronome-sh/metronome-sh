import { MetronomeInternalConfig, OtelAttribute } from "../types";
import { Metric } from "./Metric";
import { MetricExporter } from "./MetricExporter";
import { Span } from "./Span";
import { SpanExporter } from "./SpanExporter";
import { asyncLocalStorage } from "@asyncLocalStorage";

let tracerInstance: Tracer;

export class Tracer {
  protected spanExporter: SpanExporter;
  protected metricExporter: MetricExporter;

  constructor(options: { spanExporter: SpanExporter; metricExporter: MetricExporter }) {
    this.spanExporter = options.spanExporter;
    this.metricExporter = options.metricExporter;
  }

  public startActiveSpan<T>(
    name: string,
    options: { attributes?: Record<string, OtelAttribute> },
    callback: (span: Span) => T
  ): T | Promise<T> {
    const store = asyncLocalStorage.getStore();
    const span = new Span(name, {
      attributes: options?.attributes,
      context: { traceId: store?.traceId },
    });

    span.addOnEndListener(() => this.exportSpan(span));

    return asyncLocalStorage.run({ traceId: span.getContext().traceId }, () => callback(span));
  }

  public startSpan(name: string, options?: { attributes?: Record<string, OtelAttribute> }) {
    const span = new Span(name, { attributes: options?.attributes });
    span.addOnEndListener(() => this.exportSpan(span));
    return span;
  }

  public getAsyncLocalStore() {
    return asyncLocalStorage.getStore();
  }

  public createHistogram(name: string, attributes?: Record<string, OtelAttribute>) {
    const metric = new Metric(name, { type: "histogram", attributes });
    metric.addOnRecordListener(() => this.exportMetric(metric));
    return metric;
  }

  public createCounter(name: string, attributes?: Record<string, OtelAttribute>) {
    const metric = new Metric(name, { type: "counter", attributes });
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

export function startInstrumentation(config: MetronomeInternalConfig) {
  if (tracerInstance) return;

  tracerInstance = new Tracer({
    spanExporter: new SpanExporter(config),
    metricExporter: new MetricExporter(config),
  });
}
