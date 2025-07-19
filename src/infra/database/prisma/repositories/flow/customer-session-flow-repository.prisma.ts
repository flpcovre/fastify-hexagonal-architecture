import { CustomerSessionFlow } from '@/domain/flow/entities/customer-session-flow';
import { CustomerSessionFlowRepository } from '@/domain/flow/ports/customer-session-flow-repository';
import { PrismaClient } from '@prisma/client';

export class CustomerSessionFlowRepositoryPrisma implements CustomerSessionFlowRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient;;
  }

  public async findByCustomerId(customerId: string): Promise<CustomerSessionFlow | null> {
    return await this.prisma.customerSessionFlow.findFirst({
      where: {
        customerId: customerId,
      },
    });
  }

  public async create(session: CustomerSessionFlow): Promise<void> {
    await this.prisma.customerSessionFlow.create({
      data: session,
    });
  }

  public async save(session: CustomerSessionFlow): Promise<void> {
    await this.prisma.customerSessionFlow.updateMany({
      where: {
        customerId: session.customerId,
      },
      data: session,
    });
  }
}
