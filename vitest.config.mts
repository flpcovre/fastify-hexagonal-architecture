import path from 'path';
import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
config({ path: '.env.test' });

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'node',
      testTimeout: 15000000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});