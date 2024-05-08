export const METRONOME_CONTEXT_KEY = "__metronome_context";
export const METRONOME_VERSION = process.env.METRONOME_VERSION!;
export const METRONOME_WEB_VITALS = process.env.METRONOME_WEB_VITALS!;
export const METRONOME_METRICS_VERSION = "v5";
export const METRONOME_REPORT_ROUTE = `/__metronome/${METRONOME_VERSION}/report`;
export const METRONOME_WEB_VITALS_ROUTE = `/__metronome/${METRONOME_VERSION}/web-vitals.js`;
