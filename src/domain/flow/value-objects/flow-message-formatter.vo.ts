import { Flow } from '@/domain/flow/entities/flow';
import { FlowOption } from '@/domain/flow/entities/flow-option';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FlowMessageFormatter {
  static format(flow: Flow, options: FlowOption[]): string {
    let msg = flow.message;
    if (options.length > 0) {
      msg += '\n' + options.map((opt, i) => `${i + 1} - ${opt.text}`).join('\n');
    }
    return msg;
  }
}
