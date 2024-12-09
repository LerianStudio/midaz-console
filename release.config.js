module.exports = {
  branches: [
    "main",
    "develop",
    "hotfix/*",
    "next",
    "next-major",
    { name: "beta", prerelease: "beta" },
    { name: "alpha", prerelease: "alpha" },
    { name: "feature/authorization", prerelease: "feature-authorization" }, //remember to remove this lines
    { name: "feature/implement-githooks", prerelease: "feature-implement-githooks" }, //remember to remove this lines
    { name: "feature/input-with-tooltip", prerelease: "feature-input-with-tooltip" }, //remember to remove this lines
    { name: "feature/logger", prerelease: "feature-logger" }, //remember to remove this lines
    { name: "feature/organize-diagrams", prerelease: "feature-organize-diagrams" },//remember to remove this lines
    { name: "feature/set-email-notification", prerelease: "feature-set-email-notification" } //remember to remove this lines
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
