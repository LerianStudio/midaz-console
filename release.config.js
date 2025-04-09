module.exports = {
  branches: [
    { name: 'main' }, // Versão final X.Y.Z
    { name: 'develop', prerelease: 'beta', channel: 'beta' }, // beta.N
    { name: /^feature\/.+$/, prerelease: 'alpha', channel: 'alpha' }, // alpha.N (branchs de feature)
    { name: /^release\/.+$/, prerelease: 'rc', channel: 'rc' }, // rc.N (pré-produção)
    { name: /^hotfix\/.+$/, prerelease: 'hf', channel: 'hf' } // hf.N (hotfix em produção)
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'chore', release: 'patch' }, // chore = patch
          { type: 'fix', release: 'patch' }    // fix = patch
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        assets: [
          // Build do Next.js será incluído como artefato
          { path: '.next/**', label: 'Next.js build files' }
        ]
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
};
