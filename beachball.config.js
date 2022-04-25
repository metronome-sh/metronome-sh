/**
 * @type {import('beachball').BeachballConfig}
 */
module.exports = {
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
