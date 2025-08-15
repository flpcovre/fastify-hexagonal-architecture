import { ChatController } from '@/adapters/controllers/chat.controller';
import { CreateChatWithCustomerPhoneUseCase } from '@/application/use-cases/chats/create-chat-with-customer-phone.use-case';
import { CreateChatUseCase } from '@/domain/chat/use-cases/chats/create-chat.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';
import { ChatRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/chat-repository.prisma';
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer/customer-repository.prisma';

export function makeChatController(): ChatController {
  const createChatWithCustomerPhoneUseCase = new CreateChatWithCustomerPhoneUseCase(
    new FindCustomerUseCase(new CustomerRepositoryPrisma()),
    new CreateChatUseCase(new ChatRepositoryPrisma()),
  );

  return new ChatController(createChatWithCustomerPhoneUseCase);
}