export class Chat {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly userId: string | null,
    public readonly status: 'active' | 'finished' | 'inProgress',
    public readonly createdAt: Date,
    public readonly finishedAt: Date | null,
  ) {}

  public static make(props: Chat): Chat {
    return new Chat(
      props.id,
      props.customerId,
      props.userId,
      props.status,
      props.createdAt,
      props.finishedAt,
    );
  }
}