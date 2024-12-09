module.exports = {
  branches: [
    "main",
    "develop",
    "hotfix/*",
    "next",
    "next-major",
    { name: "beta", prerelease: "beta" },
    { name: "alpha", prerelease: "alpha" },
    { name: "feature/authorization", prerelease: "feature-authorization" },
    { name: "feature/implement-githooks", prerelease: "feature-implement-githooks" },
    { name: "feature/input-with-tooltip", prerelease: "feature-input-with-tooltip" },
    { name: "feature/logger", prerelease: "feature-logger" },
    { name: "feature/organize-diagrams", prerelease: "feature-organize-diagrams" },
    { name: "feature/set-email-notification", prerelease: "feature-set-email-notification" }
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
