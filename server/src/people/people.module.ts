import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from './people.entity';
import { Planets } from 'src/planets/planets.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import { Starships } from 'src/starships/starship.entity';
import { Species } from 'src/species/species.entity';
import { Images } from 'src/images/images.entity';
import { Films } from 'src/films/films.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports:[TypeOrmModule.forFeature([People, Planets, Vehicles, Starships, Species, Films, Images]), FileModule],
  exports: [TypeOrmModule],
  providers: [PeopleService],
  controllers: [PeopleController]
})
export class PeopleModule {}
