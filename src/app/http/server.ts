import { fastify, FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { join } from 'path';
import { FastifyAppBuilder, FastifyAppConfig } from '@/app/http/types';
import { FASTIFY_APP_CONFIG } from '@/config/fastify-app';
import fastifyAutoload from '@fastify/autoload';

class FastifyAppBuilderImpl implements FastifyAppBuilder {
  private app: FastifyInstance;

  constructor() {
    this.app = fastify().withTypeProvider<ZodTypeProvider>();
  }

  public setValidators(): this {
    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);
    return this;
  }

  public setCors(config: FastifyAppConfig['cors']): this {
    this.app.register(fastifyCors, { origin: config.origin });
    return this;
  }

  public setSwagger(config: FastifyAppConfig['swagger']): this {
    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: config.title,
          version: config.version,
          description: config.description,
        },
      },
      transform: jsonSchemaTransform,
    });
    return this;
  }

  public setSwaggerUi(config: FastifyAppConfig['swaggerUi']): this {
    this.app.register(fastifySwaggerUi, {
      routePrefix: config.routePrefix,
    });
    return this;
  }

  public setRoutes(config: FastifyAppConfig['api']): this {
    this.app.register(fastifyAutoload, {
      dir: join(__dirname, config.routesDir),
      options: {
        prefix: config.prefix,
      },
      forceESM: false,
      dirNameRoutePrefix: false,
    });
    return this;
  }

  public build(): FastifyInstance {
    return this.app;
  }
}

export async function createFastifyApp(config: Partial<FastifyAppConfig> = {}): Promise<FastifyInstance> {
  const finalConfig = { ...FASTIFY_APP_CONFIG, ...config };

  return new FastifyAppBuilderImpl()
    .setValidators()
    .setCors(finalConfig.cors)
    .setSwagger(finalConfig.swagger)
    .setSwaggerUi(finalConfig.swaggerUi)
    .setRoutes(finalConfig.api)
    .build();
}