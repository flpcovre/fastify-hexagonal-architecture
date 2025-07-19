export class CustomerSessionFlow {
  constructor(
    public readonly customerId: string,
    public currentFlowId: string,
    public readonly id?: number,
  ) {}

  static make(props: Omit<CustomerSessionFlow, 'currentFlowId'>) {
    return new CustomerSessionFlow(
      props.customerId,
      'start',
    );
  }
}