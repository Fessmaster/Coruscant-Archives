import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsEntity } from './entity/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmsEntity])],
  exports: [TypeOrmModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
