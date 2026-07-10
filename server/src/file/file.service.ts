import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Disk } from 'flydrive';
import { dirname, extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir, symlink, unlink } from 'fs/promises';
import { DeleteObject$, DeleteObjectCommand, PutObjectAclCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { lstat } from 'fs/promises';

@Injectable()
export class FileService implements OnModuleInit {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly logger = new Logger(FileService.name);
  constructor(
    @Inject('STORAGE_PROVIDER') private readonly storage: Disk,
    private readonly configService: ConfigService,
  ) {
    this.bucket = configService.getOrThrow('R2_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${configService.getOrThrow('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.getOrThrow('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  async onModuleInit() {
    const target = join(process.cwd(), 'storage', 'uploads');
    const link = join(process.cwd(), 'public', 'storage');
    // create target path if not exist
    await mkdir(target, { recursive: true });

    // create root directory for symlink if not exist
    await mkdir(dirname(link), { recursive: true });

    try {
    const stats = await lstat(link).catch(() => null);

    if (stats) {
      
      if (stats.isSymbolicLink()) {
        await unlink(link);
      } else {
        // Якщо це раптом реальна папка, краще попередити, щоб випадково не видалити файли
        this.logger.error('↪ Path public/storage is a real directory, not a symlink!');
        return;
      }
    }
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

  // async saveFile(img: Express.Multer.File) {
  //   const fileName = `${uuidv4()}${extname(img.originalname)}`;
  //   try {
  //     await this.s3Client.send(
  //       new PutObjectCommand({
  //         Bucket: this.bucket,
  //         Key: fileName,
  //         Body: img.buffer,
  //         ContentType: img.mimetype
  //       })
  //     )
  //     return fileName
  //   } catch (error) {
  //     this.logger.error('An error occurred while saving img', error.message)
  //     throw error
  //   }    
  // }

  async saveFile(img: Express.Multer.File) {
    const fileName = `${uuidv4()}${extname(img.originalname)}`;
    await this.storage.put(fileName, img.buffer);

    return fileName;
  }

  //   async deleteFile(fileName: string) {
  //   try {
  //     await this.s3Client.send(
  //       new DeleteObjectCommand({
  //         Bucket: this.bucket,
  //         Key: fileName
  //       })
  //     );
  //   } catch (error) {
  //     this.logger.error(`Failed to delete file ${fileName}`, error.stack);
  //   }
  // }

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
