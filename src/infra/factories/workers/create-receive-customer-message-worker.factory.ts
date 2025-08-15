import { HandleIncomingCustomerMessageUseCase } from '@/application/use-cases/message/handle-incoming-customer-message.use-case';
import { CreateCustomerAttachmentUseCase } from '@/domain/chat/use-cases/attachments/create-customer-attachment.use-case';
import { FindActiveCustomerChatUseCase } from '@/domain/chat/use-cases/chats/find-active-customer-chat.use-case';
import { CreateCustomerMessageUseCase } from '@/domain/chat/use-cases/messages/create-customer-message.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';
import { AttachmentRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/attachment-repository.prisma';
import { ChatRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/chat-repository.prisma';
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer/customer-repository.prisma';
import { MessageRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/message-repository.prisma';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';
import { CustomerSessionFlowRepositoryPrisma } from '@/infra/database/prisma/repositories/flow/customer-session-flow-repository.prisma';
import { FlowOptionRepositoryPrisma } from '@/infra/database/prisma/repositories/flow/flow-option-repository.prisma';
import { FlowRepositoryPrisma } from '@/infra/database/prisma/repositories/flow/flow-repository.prisma';
import { HandleCustomerSessionFlowUseCase } from '@/domain/flow/use-cases/handle-customer-session-flow.use-case';
import { FlowNavigatorUseCase } from '@/domain/flow/use-cases/flow-navigator.use-case';
import { FindInitialFlowUseCase } from '@/domain/flow/use-cases/find-initial-flow.use-case';
import { WhatsAppMessageMapperInstance } from '@/infra/mappers/whatsapp/whatsapp-message.mapper';
import { ReceiveCustomerMessageWorker } from '@/infra/services/workers/receive-customer-message.worker';
import { GlobalQueueConsumer } from '@/infra/services/queues/queue';
import { ReceiveIncomingCustomerMessageUseCase } from '@/application/use-cases/message/receive-incoming-customer-message.use-case';

export function makeReceiveCustomerMessageWorker(): ReceiveCustomerMessageWorker {
  const customerRepository = new CustomerRepositoryPrisma();
  const chatRepository = new ChatRepositoryPrisma();
  const messageRepository = new MessageRepositoryPrisma();
  const attachmentRepository = new AttachmentRepositoryPrisma();
  const customerSessionFlowRepository = new CustomerSessionFlowRepositoryPrisma();
  const flowOptionRepository = new FlowOptionRepositoryPrisma();
  const flowRepository = new FlowRepositoryPrisma();

  const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
  const findActiveCustomerChatUseCase = new FindActiveCustomerChatUseCase(chatRepository);
  const createCustomerAttachmentUseCase = new CreateCustomerAttachmentUseCase(attachmentRepository, eventBus);
  const createCustomerMessageUseCase = new CreateCustomerMessageUseCase(messageRepository, createCustomerAttachmentUseCase);
  const flowNavigatorUseCase = new FlowNavigatorUseCase(flowRepository, flowOptionRepository);
  const findInitialFlowUseCase = new FindInitialFlowUseCase(flowRepository, flowOptionRepository);
  const handleCustomerSessionFlowUseCase = new HandleCustomerSessionFlowUseCase(customerSessionFlowRepository, flowNavigatorUseCase, findInitialFlowUseCase);

  const handleIncomingCustomerMessageUseCase = new HandleIncomingCustomerMessageUseCase(
    findCustomerUseCase,
    createCustomerUseCase,
    findActiveCustomerChatUseCase,
    createCustomerMessageUseCase,
    handleCustomerSessionFlowUseCase,
  );

  const receiveIncomingCustomerMessageUseCase = new ReceiveIncomingCustomerMessageUseCase(
    handleIncomingCustomerMessageUseCase,
    WhatsAppMessageMapperInstance,
  );

  return new ReceiveCustomerMessageWorker(
    GlobalQueueConsumer,
    receiveIncomingCustomerMessageUseCase,
  );
}