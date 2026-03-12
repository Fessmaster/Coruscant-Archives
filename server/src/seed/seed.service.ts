import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
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
import { Repository, ObjectLiteral } from 'typeorm';

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

  async seedData<T extends ObjectLiteral>(
    url: string,
    numberFields: string[],
    extraFields: string[],
    repository: Repository<T>,
  ) {
    while (url != null) {
      const response = await getResponse(url);
      url = response.next;
      const rawData = getRawData(response.results);
      const normalizeData = validateNumber(rawData, numberFields);
      for (const item of normalizeData) {
        for (const field of extraFields) {
          delete item[field];
        }//TODO Зберігати масивами
        const newItem = repository.create(item);
        await repository.save(newItem);
      }
    }
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
    this.seedData(url, numberFields, extraFields, this.peopleRepository);
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
    this.seedData(url, numberFields, extraFields, this.filmsRepository);
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
    this.seedData(url, numberFields, extraFields, this.vehiclesRepository);
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
    this.seedData(url, numberFields, extraFields, this.starshipsRepository);
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
    this.seedData(url, numberFields, extraFields, this.planetsRepository);
  }
  async seedSpeciesData() {
    const numberFields = ['average_height', 'average_lifespan'];
    const extraFields = ['people', 'films', 'homeworld'];
    let url = 'https://swapi.dev/api/species/';
    this.seedData(url, numberFields, extraFields, this.speciesRepository);
  }

  test() {
    try {
      this.seedPeopleData();
      this.seedFilmsData();
      this.seedVehiclesData();
      this.seedStarShipsData();
      this.seedPlanetsData();
      this.seedSpeciesData();
      this.logger.log('✅ Сервіс активовано!');
    } catch (error) {
      this.logger.log('❌ Помимилка під час активації сервісу!', error);
    }
  }

  onApplicationBootstrap() {
    this.test();
  }
}
