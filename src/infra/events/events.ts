import { CustomerAttachmentCreatedEvent } from '@/domain/chat/events/customer-attachment-created.event';
import { CustomerAttachmentCreatedEventHandler } from '@/infra/events/handlers/customer-attachment-created.handler';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';
// import { BullMQPublisher } from '@/infra/services/queues/bullmq/bullmq-publisher';
import { UserMessageCreatedEvent } from '@/domain/chat/events/user-message-created.event';
import { UserMessageCreatedEventHandler } from '@/infra/events/handlers/user-message-created.handler';
import { makeRabbitMQPublisher } from '@/infra/factories/queues/create-rabbitmq-publisher.factory';

// const jobQueuePublisher = new BullMQPublisher({
//   host: 'redis',
//   port: 6379,
// });

const jobQueuePublisher = makeRabbitMQPublisher();

const customerAttachmentCreatedEventHandler = new CustomerAttachmentCreatedEventHandler(jobQueuePublisher);
const userMessageCreatedEventHandler = new UserMessageCreatedEventHandler(jobQueuePublisher);

eventBus.subscribe(
  CustomerAttachmentCreatedEvent,
  customerAttachmentCreatedEventHandler.handle.bind(customerAttachmentCreatedEventHandler),
);

eventBus.subscribe(
  UserMessageCreatedEvent,
  userMessageCreatedEventHandler.handle.bind(userMessageCreatedEventHandler),
);