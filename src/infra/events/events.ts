import { CustomerAttachmentCreatedEvent } from '@/domain/chat/events/customer-attachment-created.event';
import { CustomerAttachmentCreatedEventHandler } from '@/infra/events/handlers/customer-attachment-created.handler';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';
import { UserMessageCreatedEvent } from '@/domain/chat/events/user-message-created.event';
import { UserMessageCreatedEventHandler } from '@/infra/events/handlers/user-message-created.handler';
import { GlobalQueuePublisher } from '@/infra/services/queues/queue';

const customerAttachmentCreatedEventHandler = new CustomerAttachmentCreatedEventHandler(GlobalQueuePublisher);
const userMessageCreatedEventHandler = new UserMessageCreatedEventHandler(GlobalQueuePublisher);

eventBus.subscribe(
  CustomerAttachmentCreatedEvent,
  customerAttachmentCreatedEventHandler.handle.bind(customerAttachmentCreatedEventHandler),
);

eventBus.subscribe(
  UserMessageCreatedEvent,
  userMessageCreatedEventHandler.handle.bind(userMessageCreatedEventHandler),
);