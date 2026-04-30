import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { StarshipsEntity } from 'src/starships/entity/starship.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { FileModule } from 'src/file/file.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptors/response-interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PeopleEntity,
      PlanetsEntity,
      VehiclesEntity,
      StarshipsEntity,
      SpeciesEntity,
      FilmsEntity,
      ImagesEntity,
    ]),
    FileModule,
  ],
  exports: [TypeOrmModule],
  providers: [
    PeopleService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
  controllers: [PeopleController],
})
export class PeopleModule {}
