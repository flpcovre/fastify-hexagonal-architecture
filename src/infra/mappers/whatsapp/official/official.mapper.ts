import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';
import { OfficialPayload } from '@/infra/mappers/whatsapp/official/ports/official-messages.port';
import { WhatsAppMessageMapper } from '@/infra/mappers/whatsapp/whatsapp-message.mapper';

export class OfficialMapper implements WhatsAppMessageMapper<OfficialPayload> {
  public toDomain(payload: OfficialPayload): InboundCustomerMessageDto {
    const value = payload.entry[0].changes[0].value;
    const message = value.messages[0];
    const contact = value.contacts[0];

    const baseDto = {
      id: message.id,
      name: contact.profile.name,
      from: message.from,
      timestamp: message.timestamp,
      type: message.type,
      content: '',
    };

    switch (message.type) {
    case 'text':
      return {
        ...baseDto,
        content: message.text.body,
      };

    case 'image':
      return {
        ...baseDto,
        content: message.image.caption ?? '',
        media: {
          id: message.image.id,
          type: 'image',
          mimeType: message.image.mime_type,
        },
      };

    case 'audio':
      return {
        ...baseDto,
        media: {
          id: message.audio.id,
          type: 'audio',
          mimeType: message.audio.mime_type,
        },
      };

    case 'document':
      return {
        ...baseDto,
        media: {
          id: message.document.id,
          type: 'document',
          mimeType: message.document.mime_type,
          fileName: message.document.filename,
        },
      };

    default:
      throw new Error('Unsupported message type.');
    }
  };
}