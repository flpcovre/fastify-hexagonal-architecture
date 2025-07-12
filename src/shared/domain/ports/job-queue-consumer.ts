export interface JobQueueConsumer {
  consume<T = unknown>(queue: string, jobName: string, handler: (data: T) => Promise<void>): void;
}