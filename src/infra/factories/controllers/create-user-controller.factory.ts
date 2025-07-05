import { UserController } from '@/app/controllers/user.controller';
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user.use-case';
import { ListUsersUseCase } from '@/domain/user/use-cases/list-users.use-case';
import { UserRepositoryPrisma } from '@/infra/database/prisma/repositories/user-repository.prisma';
import { ArgonHasher } from '@/infra/services/hashers/argon.hasher';

export function makeUserController(): UserController {
  const userRepository = new UserRepositoryPrisma();
  const hasher = new ArgonHasher();

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    hasher,
  );

  const listUsersUseCase = new ListUsersUseCase(
    userRepository,
  );

  return new UserController(
    createUserUseCase,
    listUsersUseCase,
  );
}