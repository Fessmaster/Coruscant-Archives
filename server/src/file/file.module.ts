import { Global, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { StorageModule } from 'src/storage/storage.module';

@Global()
@Module({
  imports: [StorageModule],
  exports: [FileService],
  providers: [FileService]
})
export class FileModule {}
