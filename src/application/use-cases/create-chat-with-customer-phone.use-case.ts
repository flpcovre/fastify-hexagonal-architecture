import { CreateChatUseCase } from '@/domain/chat/use-cases/create-chat.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';

interface CreateChatWithCustomerPhoneInputDto {
  phone: string;
}

interface CreateChatWithCustomerPhoneOutputDto {
  id: string;
}

export class CreateChatWithCustomerPhoneUseCase {
  constructor(
    private readonly findCustomerUseCase: FindCustomerUseCase,
    private readonly createChatUseCase: CreateChatUseCase,
  ) {}

  public async execute(input: CreateChatWithCustomerPhoneInputDto): Promise<CreateChatWithCustomerPhoneOutputDto> {
    const customer = await this.findCustomerUseCase.execute({
      phone: input.phone,
    });

    if (!customer) {
      throw new Error('Customer not found');
    }

    const chat = await this.createChatUseCase.execute({
      customerId: customer.id,
    });

    return {
      id: chat.id,
    };
  }
}