import { WhatsAppIntegrations, WhatsAppMessageMapper, WHATSAPP_MAPPERS } from '@/infra/mappers/whatsapp/whatsapp-message.mapper';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WhatsAppMessageMapperFactory {
  static create(type: WhatsAppIntegrations): WhatsAppMessageMapper<unknown> {
    const mapper = WHATSAPP_MAPPERS[type];
    if (!mapper) {
      throw new Error(`WhatsAppMessageMapper not implemented for type: ${type}`);
    }
    return mapper;
  }
}