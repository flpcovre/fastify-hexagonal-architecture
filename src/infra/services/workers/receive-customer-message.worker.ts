import { ReceiveIncomingCustomerMessageUseCase } from '@/application/use-cases/receive-incoming-customer-message.use-case';
import { JobQueueConsumer } from '@/shared/domain/ports/job-queue-consumer';

interface Request {
  body: object;
}

export class ReceiveCustomerMessageWorker {
  constructor(
    private readonly consumer: JobQueueConsumer,
    private readonly receiveIncomingCustomerMessageUseCase: ReceiveIncomingCustomerMessageUseCase,
  ) {}

  public register(): void {
    this.consumer.consume<Request>('receive-customer-message-queue', async(req) => {
      const request = req.body;
      await this.receiveIncomingCustomerMessageUseCase.execute(request);

      // console.log(JSON.stringify(request));
    });
  }
}