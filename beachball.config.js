/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
  prereleasePrefix: "beta",
  bumpDeps: true,
  groups: [
    {
      name: "all",
      include: ["packages/*"],
    },
  ],
  access: "public",
  branch: "main",
};
