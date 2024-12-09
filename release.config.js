module.exports = {
  branches: [
    "main",
    "develop",
    "hotfix/*",
    "next",
    "next-major",
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
    { name: "feature/*", prerelease: true } // Adicionado para testes em branches feature
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
