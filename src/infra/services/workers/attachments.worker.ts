import { Attachment } from '@/domain/chat/entities/attachment';
import { UpdateAttachmentStatusUseCase } from '@/domain/chat/use-cases/attachments/update-attachment-status.use-case';
import { AttachmentRepositoryPrisma } from '@/infra/database/prisma/repositories/attachment-repository.prisma';
import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';

const consumer = new BullMQConsumer({
  host: 'redis',
  port: 6379,
});

const updateAttachmentStatusUseCase = new UpdateAttachmentStatusUseCase(new AttachmentRepositoryPrisma());

consumer.consume<Attachment>('attachments', 'download-customer-attachment', async(data) => {
  console.log(data);
  await new Promise(resolve => setTimeout(resolve, 10000));

  await updateAttachmentStatusUseCase.execute({
    id: data.id,
    status: 'processed',
    url: 'https://example.com/attachment.pdf',
  });

  console.log('Attachment status updated');
});