import { Flow } from '@/domain/flow/entities/flow';
import { FlowOption } from '@/domain/flow/entities/flow-option';
import { FlowOptionRepository } from '@/domain/flow/ports/flow-option-repository';
import { FlowRepository } from '@/domain/flow/ports/flow-repository';

interface FlowNavigatorInputDto {
  currentFlowId: string,
  message: string,
}

interface FlowNavigatorOutputDto {
  flow: Flow,
  options: FlowOption[]
}

export class FlowNavigatorUseCase {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly flowOptionRepository: FlowOptionRepository,
  ) {}

  public async execute(input: FlowNavigatorInputDto): Promise<FlowNavigatorOutputDto> {
    const options = await this.flowOptionRepository.findByFlowId(input.currentFlowId);

    const selected = options.find((_, index) => input.message.trim() === (index + 1).toString());

    if (selected) {
      const nextFlow = await this.flowRepository.findById(selected.nextFlowId);

      if (!nextFlow) throw new Error('Next flow not found.');

      const nextOptions = await this.flowOptionRepository.findByFlowId(nextFlow.id);

      return {
        flow: nextFlow,
        options: nextOptions,
      };
    };

    const flow = await this.flowRepository.findById(input.currentFlowId);
    if (flow) {
      const options = await this.flowOptionRepository.findByFlowId(flow.id);

      return {
        flow: flow,
        options: options,
      };
    }

    throw new Error('Flow Not Found');
  }
}