import { CustomerSessionFlow } from '@/domain/flow/entities/customer-session-flow';
import { FlowOption } from '@/domain/flow/entities/flow-option';
import { CustomerSessionFlowRepository } from '@/domain/flow/ports/customer-session-flow-repository';
import { FlowOptionRepository } from '@/domain/flow/ports/flow-option-repository';
import { FlowRepository } from '@/domain/flow/ports/flow-repository';
import { Flow } from '@prisma/client';

interface ProcessIncomingFlowMessageInputDto {
  customerId: string,
  message: string,
}

interface ProcessIncomingFlowMessageOutputDto {
  reply: string,
  nextFlowId?: string,
  isTerminal?: boolean,
}

export class ProcessIncomingFlowMessage {
  constructor(
    public readonly customerSessionFlowRepository: CustomerSessionFlowRepository,
    public readonly flowOptionRepository: FlowOptionRepository,
    public readonly flowRepository: FlowRepository,
  ) {}

  public async execute(input: ProcessIncomingFlowMessageInputDto): Promise<ProcessIncomingFlowMessageOutputDto> {
    let session = await this.customerSessionFlowRepository.findByCustomerId(input.customerId);

    if (!session) {
      session = CustomerSessionFlow.make({
        customerId: input.customerId,
      });

      await this.customerSessionFlowRepository.create(session);
    }

    const currentFlow = await this.flowRepository.findById(session.currentFlowId);
    const currentFlowOptions = await this.flowOptionRepository.findByFlowId(session.currentFlowId);

    if (!currentFlow) throw new Error('Current flow not found.');

    const selectedOption = currentFlowOptions.find((opt, index) =>
      input.message.trim() === (index + 1).toString(),
    );

    if (!selectedOption) {
      return {
        reply: this.buildFlowMessage(currentFlow, currentFlowOptions),
      };
    }

    const nextFlow = await this.flowRepository.findById(selectedOption.nextFlowId);
    const nextFlowOptions = await this.flowOptionRepository.findByFlowId(selectedOption.nextFlowId);

    if (!nextFlow) throw new Error('Next flow not found');

    session.currentFlowId = nextFlow.id;

    await this.customerSessionFlowRepository.save(session);

    return {
      reply: this.buildFlowMessage(nextFlow, nextFlowOptions),
      isTerminal: nextFlow.isTerminal,
    };
  }

  private buildFlowMessage(flow: Flow, options: FlowOption[]): string {
    let msg = flow.message;
    if (options.length) {
      msg += '\n' + options.map((opt, i) => `${i + 1} - ${opt.text}`).join('\n');
    }
    return msg;
  }
}