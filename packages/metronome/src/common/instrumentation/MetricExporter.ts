import { METRONOME_METRICS_VERSION } from "../constants";
import { Exporter } from "./Exporter";

export class MetricExporter extends Exporter {
  pathname = `/${METRONOME_METRICS_VERSION}/metrics`;
}
