import { InboundCustomerMessageDto } from '@/application/dtos/inbound-customer-message.dto';
import { MessageMapper } from '@/infra/mappers/whatsapp/message.mapper';

interface Contact {
  profile: {
    name: string
  }
}

type OfficialWhatsAppMessage =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | DocumentMessage;

interface BaseMessage {
  id: string;
  from: string;
  timestamp: string;
  type: string;
}

interface TextMessage extends BaseMessage {
  type: 'text';
  text: { body: string };
}

interface ImageMessage extends BaseMessage {
  type: 'image';
  image: {
    caption?: string;
    mime_type: string;
    sha256: string;
    id: string;
  };
}

interface VideoMessage extends BaseMessage {
  type: 'video';
  video: {
    caption?: string;
    mime_type: string;
    sha256: string;
    id: string;
  };
}

interface AudioMessage extends BaseMessage {
  type: 'audio';
  audio: {
    mime_type: string;
    sha256: string;
    id: string;
  };
}

interface DocumentMessage extends BaseMessage {
  type: 'document';
  document: {
    mime_type: string;
    sha256: string;
    id: string;
    filename?: string;
  };
}

export class OfficialMapper implements MessageMapper<OfficialWhatsAppMessage> {
  public toDomain(rawData: OfficialWhatsAppMessage): InboundCustomerMessageDto {
    return {
      id: rawData.,
      name: rawData.sender_name,
      from: rawData.from_number,
      timestamp: rawData.received_at,
      type: this.mapMessageType(rawData.message_type),
      content: rawData.text_content,
      media: rawData.media_content ? {
        id: rawData.media_content.id,
        type: this.mapMessageType(rawData.media_content.type),
        mimeType: rawData.media_content.mime_type,
        fileName: rawData.media_content.file_name,
        mediaKey: rawData.media_content.media_key
      } : undefined,
    };
  }
}