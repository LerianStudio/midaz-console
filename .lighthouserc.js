module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start', // comando para iniciar o servidor
      url: ['http://localhost:8081'],      // URL para executar o aplicativo midaz-console
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // ✅ Manter no nível 'warn' para não quebrar o pipeline
        'bf-cache': ['warn', { minScore: 0 }],
        'color-contrast': ['warn', { minScore: 0 }],
        'efficient-animated-content': ['warn', { maxLength: 1 }],
        'errors-in-console': ['warn', { minScore: 0 }],
        'html-has-lang': ['warn', { minScore: 0 }],
        'meta-description': ['warn', { minScore: 0 }],
        'robots-txt': ['warn', { minScore: 0 }],
        'unused-javascript': ['warn', { maxLength: 1 }],
        'uses-rel-preconnect': ['warn', { maxLength: 1 }],
        'uses-responsive-images': ['warn', { maxLength: 1 }],
        'interactive': ['warn', { minScore: 0 }],
        'largest-contentful-paint': ['warn', { minScore: 0 }],
        'legacy-javascript': ['warn', { maxLength: 1 }],
        'render-blocking-resources': ['warn', { maxLength: 1 }],
  
        // 💡 Habilitar estas linhas abaixo se você quiser validar com uma pontuação mínima de 0.9 ou outra nota:
        /*
        'bf-cache': ['error', { minScore: 0.9 }],
        'color-contrast': ['error', { minScore: 0.9 }],
        'errors-in-console': ['error', { minScore: 0.9 }],
        'html-has-lang': ['error', { minScore: 0.9 }],
        'meta-description': ['error', { minScore: 0.9 }],
        'robots-txt': ['error', { minScore: 0.9 }],
        'interactive': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { minScore: 0.9 }],
        */
      },
    },
    upload: [
      {
        target: 'temporary-public-storage', // Enviar para armazenamento público temporário
      },
      {
        target: 'filesystem',              // Salvar localmente
        outputDir: '.lighthouseci',        // Diretório onde os relatórios serão salvos
      }
    ]
  }
};
