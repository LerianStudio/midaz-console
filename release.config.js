module.exports = {
  branches: [
    { name: "main", channel: "latest" }, // Produção
    { name: "develop", channel: "next" }, // Desenvolvimento
    {
      name: "feature/*", // Branches começando com "feature/"
      channel: "alpha",
    },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "chore", release: "patch" },
          { type: "fix", release: "patch" },
          { type: "feat", release: "minor" },
        ],
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: ".next/**", label: "Next.js build files" },
        ],
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
