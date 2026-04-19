import { Module } from '@nestjs/common';
import { Disk } from 'flydrive';
import { FSDriver } from 'flydrive/drivers/fs';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
const storageProvider = {
  provide: 'STORAGE_PROVIDER',
  useFactory: () => {   
    const pathToDirectory = join(process.cwd(), 'storage', 'uploads')
    if (!existsSync(pathToDirectory)) {
      mkdirSync(pathToDirectory, { recursive: true });
    }
    return new Disk(
        new FSDriver({ location: './storage/uploads', visibility: 'public' }),
      );
  }
}
@Module({
  providers: [storageProvider],
  exports: [storageProvider]
})
export class StorageModule {}
