import { Module } from '@nestjs/common';
import { StarshipController } from './starships.controller';
import { StarshipService } from './starships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipsEntity } from './entity/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipsEntity])],
  exports: [TypeOrmModule],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
