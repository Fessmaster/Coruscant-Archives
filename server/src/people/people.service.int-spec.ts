import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import { DataSource } from 'typeorm';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { StarshipsEntity } from 'src/starships/entity/starship.entity';

jest.mock('flydrive', () => {
  return {
    Disk: jest.fn().mockImplementation(() => ({
      put: jest.fn().mockResolvedValue(true),
      get: jest.fn().mockResolvedValue('file-content'),
    })),
  };
});

describe('PeopleService (Integration)', () => {
  let service: PeopleService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          poolSize: 10,
          username: 'postgres',
          password: 'admin',
          database: 'cr_lib_test',
          autoLoadEntities: true,
          synchronize: true,          
          logging: false,
        }),
        TypeOrmModule.forFeature([
          PeopleEntity,
          ImagesEntity,
          FilmsEntity,
          PlanetsEntity,
          VehiclesEntity,
          SpeciesEntity,
          StarshipsEntity,
        ]),
      ],
      providers: [
        PeopleService,
        {
          provide: FileService,
          useValue: {
            // Мокаємо тільки ті методи, які PeopleService викликає у FileService
            saveFile: jest.fn().mockResolvedValue('fake-path.jpg'),
            deleteFile: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should create new record in DB and return name', async () => {
    const record = {
      name: 'R2-D2',
      about: 'The robot',
      hair_color: 'white',
      skin_color: 'white',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'n/a',
    };
    const savedData = await service.create(record);
    const found = await service.findById(savedData.id.toString());

    expect(found).toBeDefined();
    expect(found.name).toBe('R2-D2');
  });

  afterAll(async () => {
    const dataSource = module.get<DataSource>(DataSource);
    await dataSource.destroy(); // Закриваємо БД
    await module.close(); // Закриваємо контейнер
  });
});
