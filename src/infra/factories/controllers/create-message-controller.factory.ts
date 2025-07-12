import { MessageController } from '@/adapters/controllers/message.controller';
import { HandleIncomingCustomerMessageUseCase } from '@/application/use-cases/handle-incoming-customer-message.use-case';
import { CreateCustomerAttachmentUseCase } from '@/domain/chat/use-cases/attachments/create-customer-attachment.use-case';
import { FindActiveCustomerChatUseCase } from '@/domain/chat/use-cases/chats/find-active-customer-chat.use-case';
import { CreateCustomerMessageUseCase } from '@/domain/chat/use-cases/messages/create-customer-message.use-case';
import { CreateUserMessageUseCase } from '@/domain/chat/use-cases/messages/create-user-message.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';
import { AttachmentRepositoryPrisma } from '@/infra/database/prisma/repositories/attachment-repository.prisma';
import { ChatRepositoryPrisma } from '@/infra/database/prisma/repositories/chat-repository.prisma';
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer-repository.prisma';
import { MessageRepositoryPrisma } from '@/infra/database/prisma/repositories/message-repository.prisma';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';

export function makeMessageController() {
  const createUserMessageUseCase = new CreateUserMessageUseCase(
    new MessageRepositoryPrisma(),
  );

  const customerRepository = new CustomerRepositoryPrisma();
  const chatRepository = new ChatRepositoryPrisma();
  const messageRepository = new MessageRepositoryPrisma();
  const attachmentRepository = new AttachmentRepositoryPrisma();

  const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  const findActiveCustomerChatUseCase = new FindActiveCustomerChatUseCase(chatRepository);
  const createCustomerAttachmentUseCase = new CreateCustomerAttachmentUseCase(attachmentRepository, eventBus);
  const createCustomerMessageUseCase = new CreateCustomerMessageUseCase(messageRepository, createCustomerAttachmentUseCase);

  const handleIncomingCustomerMessageUseCase = new HandleIncomingCustomerMessageUseCase(
    findCustomerUseCase,
    createCustomerUseCase,
    findActiveCustomerChatUseCase,
    createCustomerMessageUseCase,
  );

  return new MessageController(createUserMessageUseCase, handleIncomingCustomerMessageUseCase);
}