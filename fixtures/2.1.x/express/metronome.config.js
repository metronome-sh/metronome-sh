/** @type {import('@metronome-sh/config').MetronomeConfig} */
export default {
  endpoint: "http://localhost:3004",
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: true,
  doNotTrack: async (request) => {
    // Track all events
    return false;
  },
};
