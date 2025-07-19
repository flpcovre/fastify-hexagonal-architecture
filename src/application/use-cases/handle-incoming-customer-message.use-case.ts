import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';
import { FindActiveCustomerChatUseCase } from '@/domain/chat/use-cases/chats/find-active-customer-chat.use-case';
import { CreateCustomerMessageUseCase } from '@/domain/chat/use-cases/messages/create-customer-message.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';
import { ProcessIncomingFlowMessage } from '@/domain/flow/use-cases/process-incoming-flow-message';

interface HandleIncomingCustomerMessageOutputDto {
  id?: string,
  createdAt?: Date
  reply?: string,
  isTerminal?: boolean,
}

export class HandleIncomingCustomerMessageUseCase {
  constructor(
    private readonly findCustomerUseCase: FindCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly findActiveCustomerChatUseCase: FindActiveCustomerChatUseCase,
    private readonly createCustomerMessageUseCase: CreateCustomerMessageUseCase,
    private readonly processIncomingFlowMessage: ProcessIncomingFlowMessage,
  ) {}

  public async execute(input: InboundCustomerMessageDto): Promise<HandleIncomingCustomerMessageOutputDto> {
    let customer = await this.findCustomerUseCase.execute({
      phone: input.from,
    });

    if (!customer) {
      customer = await this.createCustomerUseCase.execute({
        name: input.name,
        phone: input.from,
      });

      return await this.processIncomingFlowMessage.execute({
        customerId: customer.id,
        message: input.content,
      });
    }

    const haveActiveChat = await this.findActiveCustomerChatUseCase.execute({
      customerId: customer.id,
    });

    if (haveActiveChat) {
      return await this.createCustomerMessageUseCase.execute({
        chatId: haveActiveChat.id,
        content: input.content,
        type: input.type,
        whatsappKey: input.id,
        media: input.media,
      });
    }

    // TODO: implement the logic to forward the message to some automated flow
    // throw new Error('Customer does not have an active chat');
    return await this.processIncomingFlowMessage.execute({
      customerId: customer.id,
      message: input.content,
    });
  }
}