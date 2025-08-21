import { DownloadCustomerAttachmentUseCase } from '@/application/use-cases/message/download-customer-attachment.use-case';
import { Attachment } from '@/domain/chat/entities/attachment';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';

export class DownloadCustomerAttachmentWorker {
  constructor(
    private readonly consumer: JobQueueConsumer,
    private readonly downloadCustomerAttachmentUseCase: DownloadCustomerAttachmentUseCase,
  ) {}

  public register(): void {
    this.consumer.consume<Attachment>('download-customer-attachment-queue', async(data) => {
      await this.downloadCustomerAttachmentUseCase.execute(data);
      console.log(data);
      console.log('Attachment status updated');
    });
  }
}