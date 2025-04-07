module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run start', // command to start the server
        url: ['http://localhost:8081'],      // url to execute midaz-console app
        numberOfRuns: 3,
      },
      assert: {
        assertions: {
          // ✅ Mantain on level 'warn' don't broke pipeline
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
  
          // 💡 Enable these lines below if you want to validate with a minimum score of 0.9 or another grade:
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
      upload: {
        target: 'temporary-public-storage', // ou 'lhci' se usar um server próprio
      },
    },
  };
  