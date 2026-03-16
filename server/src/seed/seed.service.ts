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

  /**
   * Creates a Map collection containing all records from the database table
   * that were loaded during the first stage of seeding
   * Collection structure:
   * Key: external_id
   * Value: corresponding database record
   * @param data - database repository instance
   * @returns - prepared Map collection
   */
  createInnerMap<T extends ObjectLiteral>(data: T[]) {
    return new Map(data.map((item) => [item.external_id, item]));
  }

  /**
   * Creates a cache of all database records that were loaded
   * from the API during the first stage of seeding.
   * Cache structure:
   * Key: database table field name
   * Value: Map collection of all records from the corresponding database table
   */
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

  /**
   * Adds records to the database by loading them from the API using the specified URL address.
   * At this stage, only the main data is stored, and all fields required for
   * establishing relationships between tables are ignored.
   * Fields storing numeric data are converted from strings to numbers.
   * Simultaneously, the method creates a relationship map in the form of a Map collection,
   * which will be used in the next stage of seeding.
   *
   * @param url - address to the corresponding data
   * @param numberFields - array of numeric field names that need to be transformed
   * @param extraFields - array of field names to be used for creating the
   *                    relationship map and to be ignored when adding records to the database
   * @param repository - database repository instance
   * @param relationMap - relationship map for further processing
   */
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

  /**
   * Adds relationships to the corresponding fields and saves them in the database
   * @param repository - repository instance
   * @param relationFields - fields to be added
   * @param entityName - name of the entity to which relationships need to be added
   * @param relationMap - Map collection of relationships
   */
  async createRelations<T extends ObjectLiteral>(
    repository: Repository<T>,
    relationFields: string[],
    entityName: string,
    relationMap: Map<number, Record<string, number | number[]>>,
  ) {
    const entitiesToSave: T[] = [];
    // Retrieve the required table from the cache of all database
    // tables and add relationships with others to it
    const currentEntity = this.cacheData.get(entityName);
    for (const [key, value] of relationMap) {
      // key is the ID that was assigned by the API service
      const item = currentEntity.get(key);
      for (const field of relationFields) {
        // retrieve the required table that corresponds to the field name for establishing relationships
        const relevantCacheData = this.cacheData.get(field);
        // retrieve the list of IDs to be used for selecting data
        const relationIds = value[field];
        if (item == null || !relationIds || !relevantCacheData) {
          continue;
        }
        // If the list of IDs is in the form of an array, convert it into an array of database records
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
  getSeedConfig(){
    return [
    {
      name: 'people',
      url: 'https://swapi.dev/api/people/',
      numberFields: ['height', 'mass'],
      extraFields: [
      'homeworld',
      'films',
      'species',
      'vehicles',
      'starships',
    ],
      repository: this.peopleRepository,
      relationMap: this.relationPeopleMap,
      shouldCreateRelations: true,
      relationFields: ['homeworld', 'species', 'vehicles', 'starships'],
      entityName: 'people',
    },
    {
      name: 'films',
      url: 'https://swapi.dev/api/films/',
      numberFields: [],
      extraFields: [
      'characters',
      'planets',
      'species',
      'vehicles',
      'starships',
    ],
      repository: this.filmsRepository,
      relationMap: this.relationFilmsMap,
      shouldCreateRelations: true,
      relationFields: ['characters', 'planets', 'starships', 'vehicles', 'species'],
      entityName: 'films',
    },
    {
      name: 'species',
      url: 'https://swapi.dev/api/species/',
      numberFields: ['average_height', 'average_lifespan'],
      extraFields: ['people', 'films', 'homeworld'],
      repository: this.speciesRepository,
      relationMap: this.relationSpeciesMap,
      shouldCreateRelations: true,
      relationFields: ['homeworld'],
      entityName: 'species',
    },
    {
      name: 'vehicles',
      url: 'https://swapi.dev/api/vehicles/',
      numberFields: [
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cost_in_credits',
      'cargo_capacity',
    ],
      extraFields: ['pilots', 'films'],
      repository: this.vehiclesRepository,
      relationMap: null,
      shouldCreateRelations: false,
      relationFields: [],
      entityName: '',
    },
    {
      name: 'starships',
      url: 'https://swapi.dev/api/starships/',
      numberFields: [
      'length',
      'max_atmosphering_speed',
      'crew',
      'passengers',
      'cost_in_credits',
      'cargo_capacity',
      'hyperdrive_rating',
      'MGLT',
    ],
      extraFields: ['pilots', 'films'],
      repository: this.starshipsRepository,
      shouldCreateRelations: false,
      relationMap: null,
      relationFields: [],
      entityName: '',
    },
    {
      name: 'planets',
      url: 'https://swapi.dev/api/planets/',
      numberFields: [
      'rotation_period',
      'orbital_period',
      'diameter',
      'surface_water',
      'population',
    ],
      extraFields: ['residents', 'films'],
      repository: this.planetsRepository,
      relationMap: null,
      shouldCreateRelations: false,
      relationFields: [],
      entityName: '',
    }    
  ];
  }  

  async seeding() {
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
      await Promise.all([
        this.createRelations(
          this.peopleRepository,
          ['homeworld', 'species', 'vehicles', 'starships'],
          'people',
          this.relationPeopleMap,
        ),
        this.createRelations(
          this.filmsRepository,
          ['characters', 'planets', 'starships', 'vehicles', 'species'],
          'films',
          this.relationFilmsMap,
        ),
        this.createRelations(
          this.speciesRepository,
          ['homeworld'],
          'species',
          this.relationSpeciesMap,
        ),
      ]);
      this.cacheData.clear();
      this.logger.log('✅ Seeding completed!');
    } catch (error) {
      this.logger.log('❌ Error while seeding!', error);
    }
  }

  onApplicationBootstrap() {
    this.seeding();
  }
}
