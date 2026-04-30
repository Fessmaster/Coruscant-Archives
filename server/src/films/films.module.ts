import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './entity/films.entity';
import { ImagesEntity } from 'src/images/entity/images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsEntity, ImagesEntity])],
  exports: [TypeOrmModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
