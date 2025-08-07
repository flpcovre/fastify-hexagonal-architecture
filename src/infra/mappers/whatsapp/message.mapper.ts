import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';

export interface MessageMapper<T> {
  toDomain(rawData: T): InboundCustomerMessageDto;
}