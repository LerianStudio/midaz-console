module.exports = {
  branches: [
    { name: 'main', channel: 'latest' }, // Prod
    { name: 'develop', channel: 'next' }, // Dev
    {
      name: 'patch/*', // Branches begin with "patch/"
      channel: 'patch',
      prerelease: 'patch', // Generate pre-releases for "patch/*"
    },
    {
      name: 'fix/*', // Branches begin with "fix/"
      channel: 'fix',
      prerelease: 'fix', // Generate pre-releases for "fix/*"
    },
    {
      name: 'feature/*', // Branches begin with "feature/"
      channel: 'feature',
      prerelease: 'feature', // Generate pre-releases for "feature/*"
    }
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "chore", release: "patch" },
          { type: "fix", release: "patch" },
          { type: "feat", release: "minor" }
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: ".next/**", label: "Next.js build files" }
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
