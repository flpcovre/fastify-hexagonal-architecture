export class ChatUsers {
  constructor(
    public readonly chatId: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly id?: string,
  ) {}

  static make(props: Omit<ChatUsers, 'id'>): ChatUsers {
    return new ChatUsers(
      props.chatId,
      props.userId,
      props.createdAt,
    );
  }
}