import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Disk } from 'flydrive';
import { dirname, extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir, symlink } from 'fs/promises';

@Injectable()
export class FileService implements OnModuleInit {
  constructor(@Inject('STORAGE_PROVIDER') private readonly storage: Disk) {}
  private readonly logger = new Logger(FileService.name);
  async onModuleInit() {
    const target = join(process.cwd(), 'storage', 'uploads');
    const link = join(process.cwd(), 'public', 'storage');
    // create target path if not exist
    await mkdir(target, { recursive: true });

    // create root directory for symlink if not exist
    await mkdir(dirname(link), { recursive: true });

    try {
      await symlink(target, link, 'dir');
      this.logger.log('↪ Symlink created');      
    } catch (error) {
      if (error.code === 'EEXIST') {
        this.logger.log('↪ Symlink already exists');        
      } else {
        this.logger.error('↪ Symlink error', error.message);        
      }
    }
  }

  async saveFile(img: Express.Multer.File) {
    const fileName = `${uuidv4()}${extname(img.originalname)}`;
    await this.storage.put(fileName, img.buffer);

    return fileName;
  }

  async deleteFile(fileName: string) {
    try {
      await this.storage.delete(fileName);
    } catch (error) {
      this.logger.error(`Failed to delete file ${fileName}`, error.stack);
    }
  }

  async deleteFiles(imgList: string[]) {
    await Promise.all(imgList.map((img) => this.storage.delete(img)));
  }
}
