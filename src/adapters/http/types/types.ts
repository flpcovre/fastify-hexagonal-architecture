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
  api: {
    prefix: string;
    routesDir: string;
  };
  auth: {
    secret: string;
    expiresIn?: string;
  },
  apiReference: {
    routePrefix?: `/${string}` | undefined
    configuration: {
      theme?: 'default' | 'kepler' | 'alternate' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'deepSpace' | 'saturn' | 'elysiajs' | 'fastify' | 'mars' | 'laserwave' | 'none' | undefined;
    };
  };
}

export interface FastifyAppBuilder {
  setValidators(): this;
  setCors(config: FastifyAppConfig['cors']): this;
  setSwagger(config: FastifyAppConfig['swagger']): this;
  setRoutes(config: FastifyAppConfig['api']): this;
  setAuth(config: FastifyAppConfig['auth']): this;
  setApiReference(config: FastifyAppConfig['apiReference']): this;
  build(): FastifyInstance;
}