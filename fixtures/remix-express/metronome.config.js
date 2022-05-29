/**
 * @type {import('@metronome-sh/express').MetronomeConfig}
 */
module.exports = {
  ignoredRoutes: ["routes/test-$hash[.js]"],
  ignoredPathnames: [/test-.*/],
};
