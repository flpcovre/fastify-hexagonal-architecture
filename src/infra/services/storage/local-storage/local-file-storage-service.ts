import { FileStorage } from '@/infra/services/storage/file-storage';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class LocalFileStorage implements FileStorage {
  private basePath = path.join(__dirname, 'uploads');

  async saveFile(filePath: string, content: Buffer | string): Promise<string> {
    const fullPath = path.join(this.basePath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    return fullPath;
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(this.basePath, filePath);
    await fs.unlink(fullPath);
  }

  async getFileUrl(filePath: string): Promise<string> {
    return path.join(this.basePath, filePath);
  }
}
