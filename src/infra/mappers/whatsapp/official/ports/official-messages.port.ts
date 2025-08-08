import { MessageType } from '@/domain/chat/entities/message';

type OfficialWhatsAppMessage =
  | TextMessage
  | ImageMessage
  | AudioMessage
  | DocumentMessage;

export interface OfficialPayload {
  entry: OfficialPayloadChanges[],
}

interface OfficialPayloadChanges {
  changes: OfficialPayloadMessage[];
}

interface OfficialPayloadMessage {
  value: {
    contacts: Contact[];
    messages: OfficialWhatsAppMessage[];
  }
}

interface Contact {
  profile: {
    name: string;
  }
}

interface BaseMessage {
  id: string;
  from: string;
  timestamp: string;
  type: MessageType;
}

interface TextMessage extends BaseMessage {
  type: 'text';
  text: {
    body: string;
  };
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