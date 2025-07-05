import { createCustomerResponseSchema, createCustomerSchema, getCustomerResponseSchema } from '@/adapters/http/routes/customers/schema';
import { FastifyTypedInstance } from '@/adapters/http/types';
import { makeCustomerController } from '@/infra/factories/controllers/create-customer-controller.factory';
import { FastifyPluginCallback } from 'fastify';

const customerController = makeCustomerController();

const customerRoutes: FastifyPluginCallback = async(app: FastifyTypedInstance) => {
  app.get('/customers', {
    schema: {
      tags: ['customers'],
      description: 'List customers',
      response: {
        200: getCustomerResponseSchema,
      },
    },
  }, customerController.index.bind(customerController));

  app.post('/customers', {
    schema: {
      tags: ['customers'],
      description: 'Create a new customer',
      body: createCustomerSchema,
      response: {
        201: createCustomerResponseSchema,
      },
    },
  }, customerController.store.bind(customerController));
};

export default customerRoutes;