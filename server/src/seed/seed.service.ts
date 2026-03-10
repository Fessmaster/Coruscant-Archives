import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getPeopleData } from 'src/common/seeding/data.seeding';
import { People } from 'src/people/people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap{
  private readonly logger = new Logger(SeedService.name)
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>
  ){}

  test(){
    try {
      getPeopleData(this.peopleRepository)
      this.logger.log('✅ Сервіс запускається! Перувір БД')
      
    } catch (error) {
      this.logger.log('❌ Якась помилка! Перувір БД', error)
    }
  }
  
  onApplicationBootstrap() {
    this.test()    
  }
}
