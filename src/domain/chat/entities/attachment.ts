import { MessageType } from '@/domain/chat/entities/message';

export type AttachmentStatus = 'pending' | 'failed' | 'processed';

export class Attachment {
  constructor(
    public readonly id: string,
    public readonly messageId: string,
    public readonly type: MessageType,
    public readonly mimeType: string,
    public readonly fileName: string | null,
    public readonly mediaKey: string | null,
    public readonly url: string | null,
    public readonly status: AttachmentStatus,
    public readonly createdAt: Date,
  ) {}

  static make(props: Attachment): Attachment {
    return new Attachment(
      props.id,
      props.messageId,
      props.type,
      props.mimeType,
      props.fileName,
      props.mediaKey,
      props.url,
      props.status,
      props.createdAt,
    );
  }
}