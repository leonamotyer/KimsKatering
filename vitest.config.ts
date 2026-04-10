import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  // Vite loads postcss.config.mjs by default; @tailwindcss/postcss as a string
  // breaks Vitest startup. Inline empty PostCSS skips that file for tests only.
  css: {
    postcss: {
      plugins: [],
    },
  },
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 10000, // 10 second default timeout
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', '.next', 'out', 'dist'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  // Exclude PostCSS config from being processed during tests
  optimizeDeps: {
    exclude: ['postcss'],
  },
});

