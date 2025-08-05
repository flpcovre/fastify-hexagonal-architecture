import '@fastify/jwt';
import { UserJwtData } from '@/shared/domain/ports/jwt-service';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: UserJwtData & {
      iat?: number;
      exp?: number;
    };
    user: UserJwtData;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    authenticatedUser?: UserJwtData;
  }
}