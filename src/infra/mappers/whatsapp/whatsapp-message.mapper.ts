import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';
import { WhatsAppIntegrations, WHATSAPP_INTEGRATION } from '@/config/whatsapp.config';
import { WhatsAppMessageMapperFactory } from '@/infra/factories/mappers/whatsapp-message-mapper.factory';
import { OfficialMapper } from '@/infra/mappers/whatsapp/official/official.mapper';

export interface WhatsAppMessageMapper<T> {
  toDomain(payload: T): InboundCustomerMessageDto;
}

export const WHATSAPP_MAPPERS: Record<WhatsAppIntegrations, WhatsAppMessageMapper<unknown>> = {
  [WhatsAppIntegrations.OFFICIAL]: new OfficialMapper(),
};

export const WhatsAppMessageMapperInstance: WhatsAppMessageMapper<unknown> =
  WhatsAppMessageMapperFactory.create(WHATSAPP_INTEGRATION);