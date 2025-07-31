import { AuthController } from '@/adapters/controllers/auth.controller';
import { AuthenticateUserUseCase } from '@/domain/user/use-cases/authenticate-user.use-case';
import { UserRepositoryPrisma } from '@/infra/database/prisma/repositories/user/user-repository.prisma';

export function makeAuthController(): AuthController {
  const userRepositoryPrisma = new UserRepositoryPrisma();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryPrisma);

  return new AuthController(authenticateUserUseCase);
}