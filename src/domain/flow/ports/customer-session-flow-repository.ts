import { CustomerSessionFlow } from '@/domain/flow/entities/customer-session-flow';

export interface CustomerSessionFlowRepository {
  findByCustomerId(customerId: string): Promise<CustomerSessionFlow | null>
  create(session: CustomerSessionFlow): Promise<void>
  save(session: CustomerSessionFlow): Promise<void>
  delete(session: CustomerSessionFlow): Promise<void>
}