module.exports = {
  branches: [
    { name: "main", channel: "latest" }, // Produção
    { name: "develop", channel: "next" }, // Desenvolvimento
    {
      name: "patch/*", // Branches começando com "patch/"
      channel: "patch",
      prerelease: "patch-${name}", // Gera pré-releases para "patch/*"
    },
    {
      name: "fix/*", // Branches começando com "fix/"
      channel: "fix",
      prerelease: "fix-${name}", // Identificador derivado do nome da branch
    },
    {
      name: "feature/*", // Branches começando com "feature/"
      channel: "feature",
      prerelease: "feature-${name}", // Identificador derivado do nome da branch
    },
    {
      name: "hotfix/*", // Adicionado para hotfixes
      channel: "hotfix",
      prerelease: "hotfix-${name}", // Pré-releases para "hotfix/*"
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
