import { DownloadCustomerAttachmentUseCase } from '@/application/use-cases/message/download-customer-attachment.use-case';
import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { AttachmentRepositoryPrisma } from '@/infra/database/prisma/repositories/chat/attachment-repository.prisma';
import { GlobalQueueConsumer } from '@/infra/services/queues/queue';
import { LocalFileStorage } from '@/infra/services/storage/local-storage/local-file-storage-service';
import { GlobalWhatsAppServiceInstance } from '@/infra/services/whatsapp/whatsapp-service';
import { DownloadCustomerAttachmentWorker } from '@/infra/services/workers/download-customer-attachment.worker';

export function makeDownloadCustomerAttachmentWorker(): DownloadCustomerAttachmentWorker {
  const attachmentRepository = new AttachmentRepositoryPrisma();
  const updateAttachmentStatusUseCase = new UpdateAttachmentStatusUseCase(attachmentRepository);
  const fileStorage = new LocalFileStorage();

  const downloadCustomerAttachmentUseCase = new DownloadCustomerAttachmentUseCase(
    GlobalWhatsAppServiceInstance,
    updateAttachmentStatusUseCase,
    fileStorage,
  );

  return new DownloadCustomerAttachmentWorker(
    GlobalQueueConsumer,
    downloadCustomerAttachmentUseCase,
  );
}