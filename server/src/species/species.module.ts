import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesEntity } from './entity/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity])],
  exports: [TypeOrmModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
