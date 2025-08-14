import { ReceiveIncomingCustomerMessageUseCase } from '@/application/use-cases/receive-incoming-customer-message.use-case';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';

interface Request {
  payload: object;
}

export class ReceiveCustomerMessageWorker {
  constructor(
    private readonly consumer: JobQueueConsumer,
    private readonly receiveIncomingCustomerMessageUseCase: ReceiveIncomingCustomerMessageUseCase,
  ) {}

  public register(): void {
    this.consumer.consume<Request>('receive-customer-message-queue', async(req) => {
      await this.receiveIncomingCustomerMessageUseCase.execute(req);
    });
  }
}