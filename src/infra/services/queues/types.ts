export type JobQueueServices = 'BullMQ' | 'RabbitMQ';

interface BaseConnection {
  host: string;
  port: number;
}

export type BullMQConnection = BaseConnection;

export interface RabbitMQConnection extends BaseConnection {
  username: string;
  password: string;
  vhost?: string;
}

type JobQueueConnection = BullMQConnection | RabbitMQConnection;

export interface JobQueueConfig {
  service: JobQueueServices;
  connection: JobQueueConnection;
}