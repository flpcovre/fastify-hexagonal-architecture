import { CustomerSessionFlow } from '@/domain/flow/entities/customer-session-flow';
import { CustomerSessionFlowRepository } from '@/domain/flow/ports/customer-session-flow-repository';
import { FindInitialFlowUseCase } from '@/domain/flow/use-cases/find-initial-flow.use-case';
import { FlowNavigatorUseCase } from '@/domain/flow/use-cases/flow-navigator.use-case';
import { FlowMessageFormatter } from '@/domain/flow/value-objects/flow-message-formatter.vo';

interface HandleCustomerSessionFlowInputDto {
  customerId: string,
  message: string,
}

interface HandleCustomerSessionFlowOutputDto {
  reply: string,
  nextFlowId?: string,
  isTerminal?: boolean,
}

export class HandleCustomerSessionFlowUseCase {
  constructor(
    private readonly customerSessionFlowRepository: CustomerSessionFlowRepository,
    private readonly flowNavigatorUseCase: FlowNavigatorUseCase,
    private readonly findInitialFlowUseCase: FindInitialFlowUseCase,
  ) {}

  public async execute(input: HandleCustomerSessionFlowInputDto): Promise<HandleCustomerSessionFlowOutputDto> {
    let session = await this.customerSessionFlowRepository.findByCustomerId(input.customerId);

    if (!session) {
      session = CustomerSessionFlow.make({ customerId: input.customerId });

      const { flow, options } = await this.findInitialFlowUseCase.execute();

      await this.customerSessionFlowRepository.create(session);

      return {
        reply: FlowMessageFormatter.format(flow, options),
        isTerminal: flow.isTerminal,
      };
    }

    const { flow, options } = await this.flowNavigatorUseCase.execute({
      currentFlowId: session.currentFlowId,
      message: input.message,
    });

    if (flow.isTerminal) {
      await this.customerSessionFlowRepository.delete(session);
    } else {
      session.currentFlowId = flow.id;
      await this.customerSessionFlowRepository.save(session);
    }

    return {
      reply: FlowMessageFormatter.format(flow, options),
      isTerminal: flow.isTerminal,
    };
  }
}