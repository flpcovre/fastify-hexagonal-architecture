import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';
import { getActiveWhatsAppIntegration } from '@/config/whatsapp.config';
import { WhatsAppMessageMapperFactory } from '@/infra/factories/mappers/whatsapp-message-mapper.factory';
import { OfficialMapper } from '@/infra/mappers/whatsapp/official/official.mapper';
import { WhatsAppIntegrations } from '@/infra/services/whatsapp/whatsapp';

export interface WhatsAppMessageMapper<T> {
  toDomain(payload: T): InboundCustomerMessageDto;
}

export const WHATSAPP_MAPPERS: Record<WhatsAppIntegrations, WhatsAppMessageMapper<unknown>> = {
  [WhatsAppIntegrations.OFFICIAL]: new OfficialMapper(),
};

export const WhatsAppMessageMapperInstance: WhatsAppMessageMapper<unknown> =
  WhatsAppMessageMapperFactory.create(getActiveWhatsAppIntegration());