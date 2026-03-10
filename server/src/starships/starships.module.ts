import { Module } from '@nestjs/common';
import { StarshipController } from './starships.controller';
import { StarshipService } from './starships.service';

@Module({
  controllers: [StarshipController],
  providers: [StarshipService]
})
export class StarshipModule {}
