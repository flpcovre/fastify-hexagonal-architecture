import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import path from 'path';
import { readdirSync } from 'fs';

export const routes: FastifyPluginAsync = async(fastify: FastifyInstance) => {
  const routesPath = path.join(__dirname, '../routes');
  const files = readdirSync(routesPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

  for (const file of files) {
    const routeModule = await import(path.join(routesPath, file));

    const exportedFn = Object.values(routeModule).find(fn => typeof fn === 'function');

    if (exportedFn) {
      await (exportedFn as (app: FastifyInstance) => Promise<void>)(fastify);
    }
  }
};