export type MessageType = 'text' | 'image' | 'audio' | 'document';
export type MessageOrigin = 'customer' | 'user';

export class Message {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly senderUserId: string | null,
    public readonly content: string,
    public readonly type: MessageType,
    public readonly origin: MessageOrigin,
    public readonly whatsappKey: string | null,
    public readonly read: boolean,
    public readonly createdAt: Date,
    public readonly order?: number,
  ) {}

  static make(props: Omit<Message, 'order'>): Message {
    return new Message(
      props.id,
      props.chatId,
      props.senderUserId,
      props.content,
      props.type,
      props.origin,
      props.whatsappKey,
      props.read,
      props.createdAt,
    );
  }
}