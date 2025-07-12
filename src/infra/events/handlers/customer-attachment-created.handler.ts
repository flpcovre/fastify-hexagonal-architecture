import { CustomerAttachmentCreatedEvent } from '@/domain/chat/events/customer-attachment-created.event';
import { JobQueuePublisher } from '@/shared/domain/ports/job-queue-publisher';

export class CustomerAttachmentCreatedEventHandler {
  constructor(
    private readonly queue: JobQueuePublisher,
  ) {}

  public async handle(event: CustomerAttachmentCreatedEvent): Promise<void> {
    await this.queue.publish('attachments', 'download-attachment', event.attachment);
  }
}