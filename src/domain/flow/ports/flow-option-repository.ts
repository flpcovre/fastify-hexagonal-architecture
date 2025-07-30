import { FlowOption } from '@/domain/flow/entities/flow-option';

export interface FlowOptionRepository {
  findByFlowId(flowId: string): Promise<FlowOption[]>
}