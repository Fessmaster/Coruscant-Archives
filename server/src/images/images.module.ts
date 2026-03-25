import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Images])],
  exports: [TypeOrmModule],
})
export class ImageModule {}
