import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
    files: 'test/**/*.test.js',
    nodeResolve: true,
    coverage: true,
    coverageConfig: {
        reportDir: 'coverage',
        threshold: {
            statements: 85,
            branches: 85,
            functions: 85,
            lines: 85
        }
    },
    browsers: [
        playwrightLauncher({ product: 'chromium' }),
    ],
    testFramework: {
        config: {
            ui: 'bdd',
            timeout: '2000'
        }
    }
};