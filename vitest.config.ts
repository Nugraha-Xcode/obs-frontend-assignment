import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    isolate: false,
    fileParallelism: false,
    testTimeout: 10000,
    include: ['src/tests/**/*.test.tsx'],
    server: {
      deps: {
        inline: ['@mui/material', '@mui/icons-material'],
      },
    },
  },
});
