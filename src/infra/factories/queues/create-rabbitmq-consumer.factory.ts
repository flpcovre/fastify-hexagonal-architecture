import { RabbitMQConsumer } from '@/infra/services/queues/rabbitmq/rabbitmq-consumer';

export function makeRabbitMQConsumer(): RabbitMQConsumer {
  const config = {
    host: 'rabbitmq',
    port: 5672,
    username: 'admin',
    password: 'admin',
    vhost: '/',
  };

  return new RabbitMQConsumer(config);
}