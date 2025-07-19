import { Flow } from '@/domain/flow/entities/flow';
import { FlowRepository } from '@/domain/flow/ports/flow-repository';
import { PrismaClient } from '@prisma/client';

export class FlowRepositoryPrisma implements FlowRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findById(id: string): Promise<Flow | null> {
    return await this.prisma.flow.findFirst({
      where: {
        id: id,
      },
    });
  }
}