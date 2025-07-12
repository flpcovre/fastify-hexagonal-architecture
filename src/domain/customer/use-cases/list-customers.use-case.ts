import { CustomerRepository } from '@/domain/customer/ports/customer-repository';

interface ListCustomersOutputDto {
  id: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: Date;
}

export class ListCustomersUseCase{
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async execute(): Promise<ListCustomersOutputDto[]> {
    const customers = await this.customerRepository.findAll();

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email ?? undefined,
      phone: customer.phone,
      createdAt: customer.createdAt,
    }));
  }
}