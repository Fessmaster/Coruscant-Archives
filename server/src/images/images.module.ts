import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesEntity } from './entity/images.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([ImagesEntity])],
  exports: [TypeOrmModule],
})
export class ImageModule {}
