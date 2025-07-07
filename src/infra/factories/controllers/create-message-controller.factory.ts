import { MessageController } from '@/adapters/controllers/message.controller';
import { CreateUserMessageUseCase } from '@/domain/chat/use-cases/create-user-message.use-case';
import { MessageRepositoryPrisma } from '@/infra/database/prisma/repositories/message-repository.prisma';

export function makeMessageController() {
  const createUserMessageUseCase = new CreateUserMessageUseCase(
    new MessageRepositoryPrisma(),
  );

  return new MessageController(createUserMessageUseCase);
}