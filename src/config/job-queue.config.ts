import { JobQueueConfig, JobQueueServices } from '@/infra/services/queues/types';

function getJobQueueConfig(): JobQueueConfig {
  const service = process.env.JOB_QUEUE_SERVICE as JobQueueServices;

  if (!service) {
    throw new Error('JOB_QUEUE_SERVICE is not defined in .env');
  }

  const services: Record<JobQueueServices, JobQueueConfig> = {
    BullMQ: {
      service: 'BullMQ',
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    },
    RabbitMQ: {
      service: 'RabbitMQ',
      connection: {
        host: process.env.RABBITMQ_HOST || 'localhost',
        port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
        username: process.env.RABBITMQ_USER || 'guest',
        password: process.env.RABBITMQ_PSWD || 'guest',
        vhost: process.env.RABBITMQ_VHOST,
      },
    },
  };

  if (!services[service]) {
    throw new Error(`Unsupported job queue service: ${service}`);
  }

  return services[service];
};

export const JOB_QUEUE_CONFIG = getJobQueueConfig();