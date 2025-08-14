import { GlobalQueueConsumer } from '@/infra/services/queues/queue';
import { SendUserMessageWorker } from '@/infra/services/workers/send-user-message.worker';

export function makeSendUserMessageWorker(): SendUserMessageWorker {
  return new SendUserMessageWorker(GlobalQueueConsumer);
}