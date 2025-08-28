import { FileStorageServices } from '@/config/storage.config';
import { FileStorage } from '@/infra/services/storage/file-storage';
import { LocalFileStorage } from '@/infra/services/storage/local-storage/local-file-storage-service';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FileStorageServiceFactory {
  static fileStorageServices: Record<FileStorageServices, FileStorage> = {
    [FileStorageServices.LOCAL]: new LocalFileStorage(),
  };

  static create(type: FileStorageServices): FileStorage {
    const mapper = this.fileStorageServices[type];
    if (!mapper) {
      throw new Error(`FileStorageServices not implemented for type: ${type}`);
    }
    return mapper;
  }
}