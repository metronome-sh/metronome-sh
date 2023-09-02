/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
  bumpDeps: true,
  groups: [
    {
      name: "all",
      include: [
        "packages/*",
        "package.json",
        "beachball.config.js",
        "turbo.json",
        "yarn.lock",
      ],
    },
  ],
  access: "public",
  branch: "main",
};
