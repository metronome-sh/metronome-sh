/**
 * @type {import('@metronome-sh/config').MetronomeConfig}
 */
module.exports = {
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: true,
  doNotTrack: (request) => {
    // Track all events
    return false;
  },
};
