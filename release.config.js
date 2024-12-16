module.exports = {
  branches: [
    { name: 'main', channel: 'latest' },    // Prod
    { name: 'develop', channel: 'next' },    // Dev
    { name: 'feature/validate-with-no-ci', channel: 'feat' },    // Feature branch
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
