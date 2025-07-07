import { CreateChatUseCase } from '@/domain/chat/use-cases/create-chat.use-case';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { FindCustomerUseCase } from '@/domain/customer/use-cases/find-customer.use-case';

interface CreateChatWithCustomerInputDto {
  name: string;
  email?: string;
  phone: string;
}

interface CreateChatWithCustomerOutputDto {
  id: string;
  customer: {
    id: string;
    name: string;
    email?: string;
    phone: string;
    createdAt: Date;
  };
  status: 'active' | 'finished' | 'inProgress';
  createdAt: Date;
}

export class CreateChatWithCustomerOrchestrator {
  constructor(
    private readonly createChatUseCase: CreateChatUseCase,
    private readonly findCustomerUseCase: FindCustomerUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
  ) {}

  public async execute(input: CreateChatWithCustomerInputDto): Promise<CreateChatWithCustomerOutputDto> {
    let customer = await this.findCustomerUseCase.execute({
      phone: input.phone,
    });

    if (!customer) {
      customer = await this.createCustomerUseCase.execute({
        name: input.name,
        email: input.email,
        phone: input.phone,
      });
    }

    const chat = await this.createChatUseCase.execute({
      customerId: customer.id,
    });

    return {
      id: chat.id,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email ?? undefined,
        phone: customer.phone,
        createdAt: customer.createdAt,
      },
      status: chat.status,
      createdAt: chat.createdAt,
    };
  }
}