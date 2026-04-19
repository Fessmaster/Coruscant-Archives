import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Disk } from 'flydrive';
import { dirname, extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir, symlink } from 'fs/promises';

@Injectable()
export class FileService implements OnModuleInit {
  constructor(@Inject('STORAGE_PROVIDER') private readonly storage: Disk) {}
  async onModuleInit() {
    const target = join(process.cwd(), 'storage', 'uploads');
    const link = join(process.cwd(), 'public', 'storage');

    await mkdir(target, { recursive: true });

    await mkdir(dirname(link), { recursive: true });

    try {
      await symlink(target, link, 'dir')
      console.log('-- Symlink created');      
    } catch (error) {
      if (error.code ==='EEXIST'){ 
        console.log('-- Symlink already exists');
      } else {
        console.log('-- Symlink error', error);
      }
    }
  }
  private readonly logger = new Logger(FileService.name);

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
