export class Flow {
  constructor(
    public readonly id: string,
    public readonly message: string,
    public readonly isTerminal: boolean,
  ) {}
}