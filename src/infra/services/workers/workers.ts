import '@/infra/events/events';
import { makeDownloadCustomerAttachmentWorker } from '@/infra/factories/workers/create-download-customer-attachment-worker.factory';
import { makeReceiveCustomerMessageWorker } from '@/infra/factories/workers/create-receive-customer-message-worker.factory';
import { makeSendUserMessageWorker } from '@/infra/factories/workers/create-send-user-message-worker.factory';

const downloadCustomerAttachmentWorker = makeDownloadCustomerAttachmentWorker();
const sendUserMessageWorker = makeSendUserMessageWorker();
const receiveCustomerMessageWorker = makeReceiveCustomerMessageWorker();

receiveCustomerMessageWorker.register();
downloadCustomerAttachmentWorker.register();
sendUserMessageWorker.register();