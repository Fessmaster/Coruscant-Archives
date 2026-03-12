import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  exports: [TypeOrmModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
