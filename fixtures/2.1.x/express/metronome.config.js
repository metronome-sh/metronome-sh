/** @type {import('@metronome-sh/config').MetronomeConfig} */
export default {
  // endpoint: "https://test.metronome.sh/metrics",
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: true,
  doNotTrack: async (request) => {
    // Track all events
    return false;
  },
};
