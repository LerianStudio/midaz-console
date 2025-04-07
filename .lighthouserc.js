module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run start', // ou seu comando para rodar a app
        url: ['http://localhost:8081'],      // ou URL pública
        numberOfRuns: 3,
      },
      assert: {
        preset: 'lighthouse:recommended',
      },
      upload: {
        target: 'temporary-public-storage', // ou 'lhci' se usar um server próprio
      },
    },
  };
  