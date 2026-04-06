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
import { PeopleEntity } from './people/entity/people.entity';
import { FilmsEntity } from './films/entity/films.entity';
import { PlanetsEntity } from './planets/entity/planets.entity';
import { VehiclesEntity } from './vehicles/entity/vehicles.entity';
import { StarshipsEntity } from './starships/entity/starship.entity';
import { SpeciesEntity } from './species/entity/species.entity';
import { ImageModule } from './images/images.module';
import { ImagesEntity } from './images/entity/images.entity';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './common/configs/typeorm.config';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService)
    }),
    PeopleModule,
    FilmsModule,
    PlanetsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipModule,
    ImageModule,
    FileModule,
    UsersModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, FileService],
})
export class AppModule {}
