import { AuthController } from '@/adapters/controllers/auth.controller';
import { AuthenticateUserUseCase } from '@/domain/user/use-cases/authenticate-user.use-case';
import { UserRepositoryPrisma } from '@/infra/database/prisma/repositories/user/user-repository.prisma';
import { ArgonHasher } from '@/infra/services/hashers/argon.hasher';
import { FastifyJwtService } from '@/infra/services/auth/jwt/fastify-jwt-service';
import { FastifyInstance } from 'fastify';

export function makeAuthController(fastify: FastifyInstance): AuthController {
  const userRepositoryPrisma = new UserRepositoryPrisma();
  const hasher = new ArgonHasher();
  const jwtService = new FastifyJwtService(fastify);

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    userRepositoryPrisma,
    hasher,
    jwtService,
  );

  return new AuthController(authenticateUserUseCase);
}