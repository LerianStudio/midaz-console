module.exports = {
  branches: [
    "main",
    "develop",
    "hotfix/*",
    "next",
    "next-major",
    { name: "beta", prerelease: "beta" },
    { name: "alpha", prerelease: "alpha" },
    { name: "feature/*", prerelease: "feature" } // Definindo um identificador para branches feature
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist/*.js", label: "JavaScript distribution" },
          { path: "dist/*.map", label: "Source map" }
        ]
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
};
