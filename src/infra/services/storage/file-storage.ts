import { FILE_STORAGE } from '@/config/storage.config';
import { FileStorageServiceFactory } from '@/infra/factories/services/file-storage-service.factory';

export interface FileStorage {
  saveFile(path: string, content: Buffer | string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): Promise<string>;
}

export const GlobalFileStorageService = FileStorageServiceFactory.create(FILE_STORAGE);