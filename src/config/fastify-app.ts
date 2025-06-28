import { FastifyAppConfig } from '@/app/http/types';

export const FASTIFY_APP_CONFIG: FastifyAppConfig = {
  cors: {
    origin: '*',
  },
  swagger: {
    title: 'Appointments API',
    version: '1.0.0',
    description: 'API para gerenciamento de agendamentos',
  },
  swaggerUi: {
    routePrefix: '/docs',
  },
  api: {
    prefix: '/api',
    routesDir: './routes',
  },
} as const;