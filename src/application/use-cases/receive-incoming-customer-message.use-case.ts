import { HandleIncomingCustomerMessageUseCase } from '@/application/use-cases/handle-incoming-customer-message.use-case';
import { WhatsAppMessageMapper } from '@/infra/mappers/whatsapp/whatsapp-message.mapper';

export class ReceiveIncomingCustomerMessageUseCase {
  constructor(
    private readonly handleIncomingCustomerMessageUseCase: HandleIncomingCustomerMessageUseCase,
    private readonly whatsAppMapper: WhatsAppMessageMapper<unknown>,
  ) {}

  public async execute(input: object): Promise<void> {
    const inboundCustomerMessage = this.whatsAppMapper.toDomain(input);
    await this.handleIncomingCustomerMessageUseCase.execute(inboundCustomerMessage);
  }
}