type FileResponse = Blob | ArrayBuffer | Buffer;

export interface WhatsAppService {
  downloadMedia(id: string): Promise<FileResponse>;
}