import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { StarshipModule } from './starships/starships.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed/seed.service';
import { People } from './people/people.entity';
import { Films } from './films/films.entity';
import { Planets } from './planets/planets.entity';
import { Vehicles } from './vehicles/vehicles.entity';
import { Starships } from './starships/starship.entity';
import { Species } from './species/species.entity';
import { ImageModule } from './images/images.module';
import { Images } from './images/images.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      poolSize: 10,
      username: 'postgres',
      password: 'admin',
      database: 'cr_lib',
      entities: [People, Films, Planets, Vehicles, Starships, Species, Images],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PeopleModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipModule,
    ImageModule,
  ], 
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
