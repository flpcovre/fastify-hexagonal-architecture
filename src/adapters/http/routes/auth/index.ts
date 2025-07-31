import { authResponseSchema, authSchema } from '@/adapters/http/routes/auth/schema';
import { FastifyTypedInstance } from '@/adapters/http/types/types';
import { makeAuthController } from '@/infra/factories/controllers/create-auth-controller.factory';

const authController = makeAuthController();

export async function authRoutes(app: FastifyTypedInstance) {
  app.post('/auth', {
    schema: {
      tags: ['auth'],
      body: authSchema,
      response: {
        201: authResponseSchema,
      },
    },
  }, authController.auth.bind(authController));
}

export default authRoutes;