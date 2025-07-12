import { CustomerRepository } from '@/domain/customer/ports/customer-repository';

interface FindCustomerInputDto {
  phone: string;
}

interface FindCustomerOutputDto {
  id: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: Date;
}

export class FindCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async execute(input: FindCustomerInputDto): Promise<FindCustomerOutputDto | null> {
    const costumer = await this.customerRepository.findByPhone(input.phone);

    if (!costumer) return null;

    return {
      id: costumer.id,
      name: costumer.name,
      email: costumer.email ?? undefined,
      phone: costumer.phone,
      createdAt: costumer.createdAt,
    };
  }
}