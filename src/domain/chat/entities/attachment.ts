import { MessageType } from '@/domain/chat/entities/message';

export type AttachmentStatus = 'pending' | 'failed' | 'processed';

interface AttachmentProps {
  id: string;
  messageId: string;
  type: MessageType;
  mimeType: string;
  fileName: string | null;
  mediaKey: string;
  path: string | null;
  status: AttachmentStatus;
  createdAt: Date;
};

export class Attachment {
  constructor(
    public readonly id: string,
    public readonly messageId: string,
    public readonly type: MessageType,
    public readonly mimeType: string,
    public readonly fileName: string | null,
    public readonly mediaKey: string,
    public path: string | null,
    public status: AttachmentStatus,
    public readonly createdAt: Date,
  ) {}

  static make(props: AttachmentProps): Attachment {
    return new Attachment(
      props.id,
      props.messageId,
      props.type,
      props.mimeType,
      props.fileName,
      props.mediaKey,
      props.path,
      props.status,
      props.createdAt,
    );
  }

  public toFailed() {
    this.status = 'failed';
  }

  public toProcessed() {
    this.status = 'processed';
  }
}