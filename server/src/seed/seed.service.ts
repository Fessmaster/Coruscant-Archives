import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createRelationMap,
  getRawData,
  getResponse,
  validateNumber,
} from 'src/common/utils/seeder.utils';
import { Films } from 'src/films/films.entity';
import { People } from 'src/people/people.entity';
import { Planets } from 'src/planets/planets.entity';
import { Species } from 'src/species/species.entity';
import { Starships } from 'src/starships/starship.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Planets)
    private readonly planetsRepository: Repository<Planets>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {}
  private relationPeopleMap = new Map();
  private relationFilmsMap = new Map();
  private relationSpeciesMap = new Map();
  private cacheData = new Map();

  createInnerMap<T extends ObjectLiteral>(data: T[]) {
    return new Map(data.map((item) => [item.external_id, item]));
  }

  async createCacheData() {
    try {
      const [people, films, planets, vehicles, starships, species] =
        await Promise.all([
          this.peopleRepository.find(),
          this.filmsRepository.find(),
          this.planetsRepository.find(),
          this.vehiclesRepository.find(),
          this.starshipsRepository.find(),
          this.speciesRepository.find(),
        ]);

      this.cacheData
        .set('homeworld', this.createInnerMap(planets))
        .set('planets', this.createInnerMap(planets))
        .set('characters', this.createInnerMap(people))
        .set('people', this.createInnerMap(people))
        .set('species', this.createInnerMap(species))
        .set('vehicles', this.createInnerMap(vehicles))
        .set('starships', this.createInnerMap(starships))
        .set('films', this.createInnerMap(films));
    } catch (error) {
      this.logger.error(`Failed to load cache: ${error}`);
      throw new Error(error);
    }
  }

  async seedData<T extends ObjectLiteral>(
    url: string,
    numberFields: string[],
    extraFields: string[],
    repository: Repository<T>,
    relationMap: Map<number, Record<string, number | number[]>> | null = null,
  ) {
    while (url != null) {
      const response = await getResponse(url);
      url = response.next;
      const rawData = getRawData(response.results);
      if (relationMap != null) {
        createRelationMap(relationMap, extraFields, rawData);
      }
      const normalizeData = validateNumber(rawData, numberFields);
      const entitiesToSave: T[] = [];
      for (const item of normalizeData) {
        for (const field of extraFields) {
          delete item[field];
        }
        entitiesToSave.push(repository.create(item as DeepPartial<T>));
      }
      try {
        await repository.save(entitiesToSave);
      } catch (error) {
        this.logger.error(`Failed saving entity from API: ${error}`);
      }
    }
  }

  async createRelations<T extends ObjectLiteral>(
    repository: Repository<T>,
    relationFields: string[],
    entityName: string,
    relationMap: Map<number, Record<string, number | number[]>>,
  ) {
    const entitiesToSave: T[] = [];
    const currentEntity = this.cacheData.get(entityName)
    for (const [key, value] of relationMap) {
      const item = currentEntity.get(key)
      for (const field of relationFields) {
        const relevantCacheData = this.cacheData.get(field);
        const relationIds = value[field];        
        if (item == null) {
          continue;
        }
        if (!relationIds || !relevantCacheData) {
          continue;
        }
        if (Array.isArray(relationIds)) {
          const relationData = relationIds.map((data) =>
            relevantCacheData.get(data),
          );
          item[field] = relationData;          
        } else {
          const relationData = relevantCacheData.get(relationIds);
          item[field] = relationData;
        }
      }
      if (item != null) entitiesToSave.push(item);
    }
    await repository.save(entitiesToSave);
  }

  async seedPeopleData() {
    const numberFields = ['height', 'mass'];
    const extraFields = [
      'homeworld',
      'films',
      'species',
      'vehicles',
      'starships',
    ];
    let url = 'https://swapi.dev/api/people/';
    await this.seedData(
      url,
      numberFields,
      extraFields,
      this.peopleRepository,
      this.relationPeopleMap,
    );
  }

  async seedFilmsData() {
    const numberFields = [];
    const extraFields = [
      'characters',
      'planets',
      'species',
      'vehicles',
      'starships',
    ];
    let url = 'https://swapi.dev/api/films/';
    await this.seedData(
      url,
      numberFields,
      extraFields,
      this.filmsRepository,
      this.relationFilmsMap,
    );
  }

  async seedSpeciesData() {
    const numberFields = ['average_height', 'average_lifespan'];
    const extraFields = ['people', 'films', 'homeworld'];
    let url = 'https://swapi.dev/api/species/';
    await this.seedData(
      url,
      numberFields,
      extraFields,
      this.speciesRepository,
      this.relationSpeciesMap,
    );
  }

  async seedVehiclesData() {
    const numberFields = [
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cost_in_credits',
      'cargo_capacity',
    ];
    const extraFields = ['pilots', 'films'];
    let url = 'https://swapi.dev/api/vehicles/';
    await this.seedData(
      url,
      numberFields,
      extraFields,
      this.vehiclesRepository,
    );
  }

  async seedStarShipsData() {
    const numberFields = [
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cost_in_credits',
      'cargo_capacity',
      'hyperdrive_rating',
      'MGLT',
    ];
    const extraFields = ['pilots', 'films'];
    let url = 'https://swapi.dev/api/starships/';
    await this.seedData(
      url,
      numberFields,
      extraFields,
      this.starshipsRepository,
    );
  }

  async seedPlanetsData() {
    const numberFields = [
      'rotation_period',
      'orbital_period',
      'diameter',
      'surface_water',
      'population',
    ];
    const extraFields = ['residents', 'films'];
    let url = 'https://swapi.dev/api/planets/';
    await this.seedData(url, numberFields, extraFields, this.planetsRepository);
  }

  async test() {
    try {
      await Promise.all([
        this.seedPeopleData(),
        this.seedFilmsData(),
        this.seedVehiclesData(),
        this.seedStarShipsData(),
        this.seedPlanetsData(),
        this.seedSpeciesData(),
      ]);
      await this.createCacheData();
      await this.createRelations(
        this.peopleRepository,
        ['homeworld', 'species', 'vehicles',  'starships'],
        'people',
        this.relationPeopleMap,
      );     
      this.logger.log('✅ Сервіс активовано!');
    } catch (error) {
      this.logger.log('❌ Помимилка під час активації сервісу!', error);
    }
  }

  onApplicationBootstrap() {
    this.test();
  }
}
