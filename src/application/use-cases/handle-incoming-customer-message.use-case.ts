import { InboundMessageDto } from '@/application/dtos/inbound-message.dto';
import { HandleCustomerMessageTypeUseCase } from '@/application/use-cases/handle-customer-message-type.use-case';
import { FindActiveCustomerChatUseCase } from '@/domain/chat/use-cases/find-active-customer-chat.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';

export class HandleIncomingCustomerMessageUseCase {
  constructor(
    private readonly findCustomerUseCase: FindCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findActiveCustomerChatUseCase: FindActiveCustomerChatUseCase,
    private readonly handleCustomerMessageTypeUseCase: HandleCustomerMessageTypeUseCase,
  ) {}

  public async execute(input: InboundMessageDto): Promise<void> {
    let customer = await this.findCustomerUseCase.execute({
      phone: input.from,
    });

    if (!customer) {
      customer = await this.createCustomerUseCase.execute({
        name: input.from,
        phone: input.from,
      });
    } else {
      const haveActiveChat = await this.findActiveCustomerChatUseCase.execute({
        customerId: customer.id,
      });

      if (haveActiveChat) {
        await this.handleCustomerMessageTypeUseCase.execute(input);
      }
    }

    // TODO: implement the logic to forward the message to some automated flow
    throw new Error('Customer does not have an active chat');
  }
}