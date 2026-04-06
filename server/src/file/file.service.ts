import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Disk } from 'flydrive';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService  {
  constructor(@Inject('STORAGE_PROVIDER') private readonly storage: Disk) {}
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
    await Promise.all(imgList.map(img => this.storage.delete(img)))    
  }

}
