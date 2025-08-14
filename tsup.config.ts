import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  dts: true,
  outDir: 'dist',
  clean: true,
  minify: false,
  sourcemap: false,
  splitting: false,
  treeshake: true,
  target: 'node18',
  platform: 'node',
  esbuildOptions(options) {
    options.keepNames = false;
    options.mangleProps = undefined;
  },
  noExternal: ['@fastify/autoload'],
  external: ['@prisma/client'],
  loader: {
    '.ts': 'ts',
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    };
  },
});