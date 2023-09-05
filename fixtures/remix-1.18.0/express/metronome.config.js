/**
 * @type {import('@metronome-sh/express').MetronomeConfig}
 */
export default {
  ignoredRoutes: [],
  ignoredPathnames: ["/healthcheck"],
  ignoreHeadMethod: false,
  doNotTrack: (request) => {
    // console.log("doNotTrack", { request });
    return true;
  },
};
