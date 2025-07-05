export class Customer {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string | null,
    public readonly phone: string,
    public readonly createdAt: Date,
  ) {}

  public static make(props: Customer): Customer {
    return new Customer(
      props.id,
      props.name,
      props.email,
      props.phone,
      props.createdAt,
    );
  }
}