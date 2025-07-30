import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { AttachmentRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/attachment-repository.prisma';
import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';
import { DownloadCustomerAttachmentWorker } from '@/infra/services/workers/download-customer-attachment.worker';

export function makeDownloadCustomerAttachmentWorker(): DownloadCustomerAttachmentWorker {
  const jobQueueConsumer = new BullMQConsumer({
    host: 'redis',
    port: 6379,
  });

  const attachmentRepository = new AttachmentRepositoryPrisma();

  const updateAttachmentStatusUseCase = new UpdateAttachmentStatusUseCase(attachmentRepository);

  return new DownloadCustomerAttachmentWorker(
    jobQueueConsumer,
    updateAttachmentStatusUseCase,
  );
}