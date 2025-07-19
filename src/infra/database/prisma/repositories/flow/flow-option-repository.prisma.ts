import { FlowOption } from '@/domain/flow/entities/flow-option';
import { FlowOptionRepository } from '@/domain/flow/ports/flow-option-repository';
import { PrismaClient } from '@prisma/client';

export class FlowOptionRepositoryPrisma implements FlowOptionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findByFlowId(flowId: string): Promise<FlowOption[]> {
    return await this.prisma.flowOption.findMany({
      where: {
        flowId: flowId,
      },
    });
  }
}