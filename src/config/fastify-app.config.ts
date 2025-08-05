import { FastifyAppConfig } from '@/adapters/http/types/types';

export const FASTIFY_APP_CONFIG: FastifyAppConfig = {
  cors: {
    origin: '*',
  },
  swagger: {
    title: 'WhatsApp Customer Service API',
    version: '1.0.0',
    description: 'API para gerenciamento de Atendimentos via WhatsApp',
  },
  api: {
    prefix: '/api',
    routesDir: 'routes',
  },
  auth: {
    secret: process.env.JWT_SECRET ?? 'secret',
    expiresIn: process.env.JWT_EXPIRES,
  },
  apiReference: {
    routePrefix: '/docs',
    configuration: {
      theme: 'kepler',
    },
  },
} as const;