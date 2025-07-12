import { CreateCustomerInput } from '@/adapters/http/routes/customers/schema';
import { CreateCustomerUseCase } from '@/domain/customer/use-cases/create-customer.use-case';
import { ListCustomersUseCase } from '@/domain/customer/use-cases/list-customers.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly listCustomersUseCase: ListCustomersUseCase,
  ) {}

  public async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const customers = await this.listCustomersUseCase.execute();
    return reply.status(200).send(customers);
  }

  public async store(request: FastifyRequest<{ Body: CreateCustomerInput }>, reply: FastifyReply): Promise<void> {
    const { name, email, phone } = request.body;

    const customer = await this.createCustomerUseCase.execute({ name, email, phone });

    return reply.status(201).send(customer);
  }
}