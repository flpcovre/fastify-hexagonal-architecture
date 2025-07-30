import { Flow } from '@/domain/flow/entities/flow';
import { FlowOption } from '@/domain/flow/entities/flow-option';
import { FlowOptionRepository } from '@/domain/flow/ports/flow-option-repository';
import { FlowRepository } from '@/domain/flow/ports/flow-repository';

interface FindInitialFlowOutputDto {
  flow: Flow,
  options: FlowOption[]
}

export class FindInitialFlowUseCase {
  constructor(
    private readonly flowRepository: FlowRepository,
    private readonly flowOptionRepository: FlowOptionRepository,
  ) {}

  public async execute(): Promise<FindInitialFlowOutputDto> {
    const initialFlow = await this.flowRepository.findById('start');

    if (!initialFlow) throw new Error('Initial flow not found');

    const options = await this.flowOptionRepository.findByFlowId(initialFlow.id);

    return {
      flow: initialFlow,
      options: options,
    };
  }
}