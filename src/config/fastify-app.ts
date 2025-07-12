import { FastifyAppConfig } from '@/adapters/http/types';

export const FASTIFY_APP_CONFIG: FastifyAppConfig = {
  cors: {
    origin: '*',
  },
  swagger: {
    title: 'WhatsApp Customer Service API',
    version: '1.0.0',
    description: 'API para gerenciamento de Atendimentos via WhatsApp',
  },
  swaggerUi: {
    routePrefix: '/docs',
  },
  api: {
    prefix: '/api',
    routesDir: './routes',
  },
} as const;