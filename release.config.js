module.exports = {
  branches: [
    { name: 'main' }, // Versão final X.Y.Z
    { name: 'develop', prerelease: 'beta', channel: 'beta' }, // beta.N
    { name: new RegExp('^feature/.+'), prerelease: 'alpha', channel: 'alpha' }, // alpha.N
    { name: new RegExp('^release/.+'), prerelease: 'rc', channel: 'rc' }, // rc.N
    { name: new RegExp('^hotfix/.+'), prerelease: 'hf', channel: 'hf' } // hf.N
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        },
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'perf', release: 'minor' },
          { type: 'build', release: 'minor' },
          { type: 'chore', release: 'patch' },
          { type: 'ci', release: 'patch' },
          { type: 'test', release: 'patch' },
          { type: 'fix', release: 'minor' },
          { type: 'refactor', release: 'minor' },
          { type: 'docs', release: 'patch' },
          { breaking: true, release: 'major' }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
        },
        writerOpts: {
          commitsSort: ['subject', 'scope']
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
        assets: ['CHANGELOG.md']
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: '.next/**', label: 'Next.js build files' }
        ]
      }
    ],
    [
      '@saithodev/semantic-release-backmerge',
      {
        backmergeBranches: [{ from: 'main', to: 'develop' }],
        message: 'chore(release): Preparations for next release [skip ci]'
      }
    ]
  ]
}
