import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // permite usar describe/test/expect sem importar
    environment: 'node',
  },
});