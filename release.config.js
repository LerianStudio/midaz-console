module.exports = {
    branches: [
      "main",           // Para o branch principal
      "develop",        // Para o branch de desenvolvimento
      "hotfix/*",       // Para branches de hotfix, como hotfix/1.0.0
      "next",           // Para o branch "next" (pré-lançamento)
      "next-major",     // Para o branch "next-major" (para versões maiores)
      { 
        name: "beta",   // Para o branch beta
        prerelease: true 
      },
      { 
        name: "alpha",  // Para o branch alpha
        prerelease: true 
      }
    ],
    plugins: [
      "@semantic-release/commit-analyzer",       // Análise de commits
      "@semantic-release/release-notes-generator", // Geração de notas de release
      "@semantic-release/changelog",             // Atualização de changelog
      [
        "@semantic-release/github",              // Publicação no GitHub
        {
          assets: [
            { path: "dist/*.js", label: "JavaScript distribution" },
            { path: "dist/*.map", label: "Source map" }
          ]
        }
      ],
      [
        "@semantic-release/git",                 // Commit das mudanças no Git
        {
          assets: ["package.json", "CHANGELOG.md"],
          message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
        }
      ]
    ]
  };
  