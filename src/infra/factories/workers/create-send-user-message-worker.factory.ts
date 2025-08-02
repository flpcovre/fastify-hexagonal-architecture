import { makeRabbitMQConsumer } from '@/infra/factories/queues/create-rabbitmq-consumer.factory';
// import { BullMQConsumer } from '@/infra/services/queues/bullmq/bullmq-consumer';
import { SendUserMessageWorker } from '@/infra/services/workers/send-user-message.worker';

export function makeSendUserMessageWorker(): SendUserMessageWorker {
  // const jobQueueConsumer = new BullMQConsumer({
  //   host: 'redis',
  //   port: 6379,
  // });
  const jobQueueConsumer = makeRabbitMQConsumer();

  return new SendUserMessageWorker(jobQueueConsumer);
}