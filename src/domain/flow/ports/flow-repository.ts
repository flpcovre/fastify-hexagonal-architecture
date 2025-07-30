import { Flow } from '@/domain/flow/entities/flow';

export interface FlowRepository {
  findById(id: string): Promise<Flow | null>
}