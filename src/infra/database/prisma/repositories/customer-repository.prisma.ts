import { Customer } from '@/domain/customer/entities/customer';
import { CustomerRepository } from '@/domain/customer/ports/customer-repository';
import { PrismaClient } from '@prisma/client';

export class CustomerRepositoryPrisma implements CustomerRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(customer: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: customer,
    });
  }

  public async findById(id: string): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  public async findByPhone(phone: string): Promise<Customer | null> {
    return await this.prisma.customer.findUnique({
      where: {
        phone,
      },
    });
  }
}