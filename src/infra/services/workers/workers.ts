import { makeDownloadCustomerAttachmentWorker } from '@/infra/factories/workers/create-download-customer-attachment-worker.factory';
import { makeSendUserMessageWorker } from '@/infra/factories/workers/create-send-user-message-worker.factory';

const downloadCustomerAttachmentWorker = makeDownloadCustomerAttachmentWorker();
const sendUserMessageWorker = makeSendUserMessageWorker();

downloadCustomerAttachmentWorker.register();
sendUserMessageWorker.register();