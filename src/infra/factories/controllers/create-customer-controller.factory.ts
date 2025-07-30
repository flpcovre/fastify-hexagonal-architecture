import { CustomerController } from '@/adapters/controllers/customer.controller';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { ListCustomersUseCase } from '@/domain/customer/use-cases/list-customers.use-case';
import { CustomerRepositoryPrisma } from '@/infra/database/prisma/repositories/customer/customer-repository.prisma';

export function makeCustomerController(): CustomerController {
  const customerRepository = new CustomerRepositoryPrisma();

  const createCustomerUseCase = new CreateCustomerUseCase(
    customerRepository,
  );

  const listCustomersUseCase = new ListCustomersUseCase(
    customerRepository,
  );

  return new CustomerController(
    createCustomerUseCase,
    listCustomersUseCase,
  );
}