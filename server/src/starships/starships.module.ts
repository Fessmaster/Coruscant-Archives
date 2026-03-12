import { Module } from '@nestjs/common';
import { StarshipController } from './starships.controller';
import { StarshipService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starships } from './starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Starships])],
  exports: [TypeOrmModule],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
