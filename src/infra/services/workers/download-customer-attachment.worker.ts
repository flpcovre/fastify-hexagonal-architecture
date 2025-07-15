import { Attachment } from '@/domain/chat/entities/attachment';
import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';

export class DownloadCustomerAttachmentWorker {
  constructor(
    private readonly consumer: JobQueueConsumer,
    private readonly updateAttachmentStatusUseCase: UpdateAttachmentStatusUseCase,
  ) {}

  public register(): void {
    this.consumer.consume<Attachment>('download-customer-attachment-queue', async(data) => {
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 10000));

      await this.updateAttachmentStatusUseCase.execute({
        id: data.id,
        status: 'processed',
        url: 'https://example.com/attachment.pdf',
      });

      console.log('Attachment status updated');
    });
  }
}