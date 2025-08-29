import { FileStorage } from '@/infra/services/storage/file-storage';
import { promises as fs } from 'fs';
import path from 'path';

export class LocalFileStorage implements FileStorage {
  private basePath = 'src/assets/uploads';
  private baseUrl  = process.env.APP_URL || 'http://localhost:3000';

  public async saveFile(filePath: string, content: Buffer | string): Promise<string> {
    const fullPath = path.join(this.basePath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);

    return fullPath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.basePath, filePath);
    await fs.unlink(fullPath);
  }

  public async getFileUrl(path: string): Promise<string> {
    throw new Error();
  }
}
