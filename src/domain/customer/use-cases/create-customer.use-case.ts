import { Customer } from '@/domain/customer/entities/customer';
import { CustomerRepository } from '@/domain/customer/ports/customer-repository';
import { randomUUID } from 'crypto';

interface CreateCustomerInputDto {
  name: string;
  email?: string;
  phone: string;
}

interface CreateCustomerOutputDto {
  id: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: Date;
}

export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async execute(input: CreateCustomerInputDto): Promise<CreateCustomerOutputDto> {
    const customerAlreadyExists = await this.customerRepository.findByPhone(input.phone);

    if (customerAlreadyExists) throw new Error('Customer already exists');

    const customer = Customer.make({
      id: randomUUID(),
      name: input.name,
      email: input.email ?? null,
      phone: input.phone,
      createdAt: new Date(),
    });

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email ?? undefined,
      phone: customer.phone,
      createdAt: customer.createdAt,
    };
  }
}