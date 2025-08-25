export interface FileStorage {
  saveFile(path: string, content: Buffer | string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): Promise<string>;
}
