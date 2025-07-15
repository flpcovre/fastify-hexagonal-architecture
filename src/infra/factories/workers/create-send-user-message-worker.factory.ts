import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';
import { SendUserMessageWorker } from '@/infra/services/workers/send-user-message.worker';

export function makeSendUserMessageWorker(): SendUserMessageWorker {
  const jobQueueConsumer = new BullMQConsumer({
    host: 'redis',
    port: 6379,
  });

  return new SendUserMessageWorker(jobQueueConsumer);
}