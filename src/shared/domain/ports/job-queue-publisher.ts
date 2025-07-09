export interface JobQueuePublisher {
  publish<T = unknown>(queue: string, jobName: string, data: T): Promise<void>;
}