import { CustomerAttachmentCreatedEvent } from '@/domain/chat/events/customer-attachment-created.event';
import { CustomerAttachmentCreatedEventHandler } from '@/infra/events/handlers/customer-attachment-created.handler';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';
import { BullMQPublisher } from '@/infra/services/queues/bullmq/bullmq-publisher';

const jobQueuePublisher = new BullMQPublisher({
  host: 'redis',
  port: 6379,
});

const customerAttachmentCreatedEventHandler = new CustomerAttachmentCreatedEventHandler(jobQueuePublisher);

eventBus.subscribe(
  CustomerAttachmentCreatedEvent as new (...args: unknown[]) => CustomerAttachmentCreatedEvent,
  customerAttachmentCreatedEventHandler.handle.bind(customerAttachmentCreatedEventHandler),
);
