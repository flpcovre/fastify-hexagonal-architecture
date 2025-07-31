import { authMiddleware } from '@/adapters/http/middlewares/auth.middleware';
import { authResponseSchema, authSchema, profileResponseSchema } from '@/adapters/http/routes/auth/schema';
import { FastifyTypedInstance } from '@/adapters/http/types/types';
import { makeAuthController } from '@/infra/factories/controllers/create-auth-controller.factory';
export async function authRoutes(app: FastifyTypedInstance) {
  const authController = makeAuthController(app);

  app.post('/auth', {
    schema: {
      tags: ['auth'],
      body: authSchema,
      response: {
        201: authResponseSchema,
      },
    },
  }, authController.auth.bind(authController));

  app.get('/auth/me', {
    preHandler: authMiddleware,
    schema: {
      tags: ['auth'],
      response: {
        200: profileResponseSchema,
      },
    },
  }, authController.me.bind(authController));
}

export default authRoutes;