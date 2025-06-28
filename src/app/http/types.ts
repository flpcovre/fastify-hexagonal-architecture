import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>

export interface FastifyAppConfig {
  cors: {
    origin: string | string[];
  };
  swagger: {
    title: string;
    version: string;
    description?: string;
  };
  swaggerUi: {
    routePrefix: string;
  };
  api: {
    prefix: string;
    routesDir: string;
  };
}

export interface FastifyAppBuilder {
  setValidators(): this;
  setCors(config: FastifyAppConfig['cors']): this;
  setSwagger(config: FastifyAppConfig['swagger']): this;
  setSwaggerUi(config: FastifyAppConfig['swaggerUi']): this;
  setRoutes(config: FastifyAppConfig['api']): this;
  build(): FastifyInstance;
}