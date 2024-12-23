module.exports = {
  branches: [
    { name: 'main', channel: 'latest' },    // Prod
    { name: 'develop', channel: 'next' },    // Dev
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "chore", release: "patch" } // Included "chore" on patch type
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: ".next/static/chunks/*.js", label: "JavaScript distribution" },
          { path: ".next/static/chunks/*.js.map", label: "Source map" }
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