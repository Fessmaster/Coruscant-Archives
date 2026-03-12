import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRawData, getResponse, validateNumber } from 'src/common/utils/seeder.utils';
import { People } from 'src/people/people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
  ) {}

  async seedPeopleData() {
    const numberFields = [ "height", "mass" ]
    let url = 'https://swapi.dev/api/people/';    
    const relationMap = new Map();
    while (url != null) {
      const response = await getResponse(url);
      url = response.next    

      const rawData = getRawData(response.results)
      const normalizeData = validateNumber(rawData, numberFields)

      for (const person of normalizeData){
        const {homeworld, films, species, vehicle, starship, ...data} = person
        const saveData = {...data}
        // console.log(saveData);
        this.peopleRepository.save({...data})
      }


      // console.log(normalizeData);
    }
  }

  test() {
    try {
      this.seedPeopleData()
      this.logger.log('✅ Сервіс активовано!');
    } catch (error) {
      this.logger.log('❌ Помимилка під час активації сервісу!', error);
    }
  }

  onApplicationBootstrap() {
    this.test();
  }
}
