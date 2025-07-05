import { ChatController } from '@/adapters/controllers/chat.controller';
import { CreateChatWithCustomerOrchestrator } from '@/application/orchestrators/create-chat-with-customer.orchestrator';
import { CreateChatUseCase } from '@/domain/chat/use-cases/create-chat.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';
import { ChatRepositoryPrisma } from '@/infra/database/prisma/repositories/chat-repository.prisma';
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer-repository.prisma';

export function makeChatController(): ChatController {
  const createChatWithCustomerOrchestrator = new CreateChatWithCustomerOrchestrator(
    new CreateChatUseCase(new ChatRepositoryPrisma()),
    new FindCustomerUseCase(new CustomerRepositoryPrisma()),
    new CreateCustomerUseCase(new CustomerRepositoryPrisma()),
  );

  return new ChatController(createChatWithCustomerOrchestrator);
}