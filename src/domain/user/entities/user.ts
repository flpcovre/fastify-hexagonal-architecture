export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: 'admin' | 'customer' | 'seller',
    public readonly createdAt: Date,
  ) {}

  public static make(props: User): User {
    return new User(
      props.id,
      props.name,
      props.email,
      props.password,
      props.role,
      props.createdAt,
    );
  }
}