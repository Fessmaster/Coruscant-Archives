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
import { ImageModule } from './images/images.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './common/configs/typeorm.config';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/exception-filter';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }),
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, FileService, {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }],
})
export class AppModule {}
