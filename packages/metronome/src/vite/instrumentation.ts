import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base";
import { METRONOME_VERSION } from "../constants";

export function startInstrumentation() {
  const resource = Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: "metronome",
      [SemanticResourceAttributes.SERVICE_VERSION]: METRONOME_VERSION,
    })
  );

  const provider = new WebTracerProvider({
    resource: resource,
  });

  const exporter = new ConsoleSpanExporter();
  const processor = new BatchSpanProcessor(exporter, { maxQueueSize: 1 });
  provider.addSpanProcessor(processor);

  provider.register();
}
