import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { routes } from './plugins/register-routes';

export async function startServer() {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors, { origin: '*' });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Appointments API',
        version: '1.0.0',
      },
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  app.register(routes);

  app.listen({ port: 3333 }).then(() => {
    console.log('Server is running on http://localhost:3333');
  });
}