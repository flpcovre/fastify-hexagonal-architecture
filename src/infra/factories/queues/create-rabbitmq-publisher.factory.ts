import { RabbitMQPublisher } from '@/infra/services/queues/rabbitmq/rabbitmq-publisher';

export function makeRabbitMQPublisher(): RabbitMQPublisher {
  const config = {
    host: 'rabbitmq',
    port: 5672,
    username: 'admin',
    password: 'admin',
    vhost: '/',
  };

  return new RabbitMQPublisher(config);
}