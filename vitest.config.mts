import path from 'path';
import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
config({ path: '.env.test' });

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      environment: 'node',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});