import { fastify, FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { join } from 'path';
import { FASTIFY_APP_CONFIG } from '@/config/fastify-app';
import { fastifyAutoload } from '@fastify/autoload';
import { fastifyJwt } from '@fastify/jwt';
import { FastifyAppBuilder, FastifyAppConfig } from '@/adapters/http/types/types';

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

  public setAuth(config: FastifyAppConfig['auth']): this {
    this.app.register(fastifyJwt, {
      secret: config.secret,
      sign: {
        expiresIn: config.expiresIn,
      },
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
    .setAuth(finalConfig.auth)
    .build();
}