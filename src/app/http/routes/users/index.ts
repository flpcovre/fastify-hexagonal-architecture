import { createUserResponseSchema, createUserSchema, getUserResponseSchema } from '@/app/http/routes/users/schema';
import { FastifyTypedInstance } from '@/app/http/types';
import { makeUserController } from '@/infra/factories/controllers/create-user-controller.factory';
import { FastifyPluginCallback } from 'fastify';

const userController = makeUserController();

const userRoutes: FastifyPluginCallback = async(app: FastifyTypedInstance) => {
  app.get('/users', {
    schema: {
      tags: ['users'],
      description: 'List users',
      response: {
        200: getUserResponseSchema,
      },
    },
  }, userController.index.bind(userController));

  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: createUserSchema,
      response: {
        201: createUserResponseSchema,
      },
    },
  }, userController.store.bind(userController));
};

export default userRoutes;