import { authMiddleware } from '@/adapters/http/middlewares/auth.middleware';
import { authResponseSchema, authSchema, profileResponseSchema } from '@/adapters/http/routes/auth/schema';
import { FastifyTypedInstance } from '@/adapters/http/types/types';
import { makeAuthController } from '@/infra/factories/controllers/create-auth-controller.factory';

export async function authRoutes(app: FastifyTypedInstance) {
  const authController = makeAuthController(app);

  app.post('/auth/login', {
    schema: {
      tags: ['auth'],
      body: authSchema,
      response: {
        201: authResponseSchema,
      },
    },
  }, authController.auth.bind(authController));

  app.get('/auth/me', {
    preHandler: [authMiddleware],
    schema: {
      tags: ['auth'],
      security: [{ bearerAuth: [] }],
      description: 'Obter informações do usuário autenticado',
      response: {
        200: profileResponseSchema,
        // 401: unauthorizedErrorSchema,
      },
    },
  }, authController.me.bind(authController));
}

export default authRoutes;