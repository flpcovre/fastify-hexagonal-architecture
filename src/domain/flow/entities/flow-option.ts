export class FlowOption {
  constructor(
    public readonly flowId: string,
    public readonly text: string,
    public readonly nextFlowId: string,
    public readonly id?: number,
  ) {}
}