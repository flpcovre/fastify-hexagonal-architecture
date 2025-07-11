import { AttachmentCreatedEvent } from '@/domain/chat/events/attachment-created.event';
import { globalEventBus as eventBus } from '@/infra/events/adapters/simple-event-bus';
import { AttachmentCreatedEventHandler } from '@/infra/events/handlers/attachment-created.handler';
import { BullMQPublisher } from '@/infra/services/queues/bullmq/bullmq-publisher';

const jobQueuePublisher = new BullMQPublisher({
  host: 'redis',
  port: 6379,
});

const attachmentCreatedEventHandler = new AttachmentCreatedEventHandler(jobQueuePublisher);

eventBus.subscribe(
  AttachmentCreatedEvent as new (...args: unknown[]) => AttachmentCreatedEvent,
  attachmentCreatedEventHandler.handle.bind(attachmentCreatedEventHandler),
);
