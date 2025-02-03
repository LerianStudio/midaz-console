module.exports = {
  branches: [
    { name: 'main', channel: 'latest' },    // Prod
    { name: 'develop', channel: 'next' },    // Dev
    { name: 'feature/', channel: 'alpha' },  // Alpha
    { name: 'fix/', channel: 'beta' },       // Beta
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "chore", release: "patch" }, // Included "chore" on patch type
          { type: "fix", release: "patch" } // Included "fix" on patch type
        ]
      }
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/github",
      {
        assets: [
          { path: ".next/**", label: "Next.js build files" } // Updated to include all files in .next/
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
  ],
  tagFormat: (version, { nextRelease }) => {
    const channel = nextRelease ? nextRelease.channel : 'latest'; // Garantir que o nextRelease e channel existem
    return `${version}${channel === 'alpha' ? '-alpha' : ''}${channel === 'beta' ? '-beta' : ''}`;
  }
};
