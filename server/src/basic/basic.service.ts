import { Logger, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { IBasicEntity } from 'src/basic/interface/basic-entity.interface';
import { FindOptionsWhere, Repository } from 'typeorm';

export abstract class BasicService<T extends IBasicEntity> {
  protected readonly logger = new Logger(this.constructor.name);
  constructor(protected readonly basicRepository: Repository<T>) {}

  private readonly LIMIT = 20;

  dataMapping(obj, fieldList: string[]) {
    const mappedData = {};
    for (const field of fieldList) {
      const entityField = field.replace(/Ids$/, '');
      if (field in obj) {
        const val = obj[field];
        if (Array.isArray(val)) {
          mappedData[entityField] = val.map((id) => ({ id: id }));
        } else if (val === null) {
          mappedData[entityField] = [];
        }
      }
    }
    return mappedData;
  }

  async findById(id: string, relations: string[]) {
    const entity = await this.basicRepository.findOne({
      where: { id: Number(id) } as unknown as FindOptionsWhere<T>,
      relations: relations,
    });

    if (!entity) {
      throw new NotFoundException(`Record width id: ${id} not exist`)
    }
    const images = entity?.images?.map((img) => {
      const imgUrl = join(process.cwd(), 'public', 'storage', img.url);
      img.url = imgUrl;
      return img;
    });    
    return { ...entity, images };
  }

  async deleteById(id: string) {
    try {
      return await this.basicRepository.softDelete(Number(id));
    } catch (error) {
      this.logger.error('An error occurred while deleted entity ', error);
    }
  }

  async restoreById(id: string) {
    try {
      return await this.basicRepository.restore(Number(id));
    } catch (error) {
      this.logger.error('An error occurred while restored entity ', error);
    }
  }

  async getArrayOfEntities(skip: number) {
    const navigation = {
      nextPage: false,
      previousPage: false,
    };
    const arrayOfEntities = await this.basicRepository.find({
      take: this.LIMIT + 1,
      skip: skip,
    });

    if (arrayOfEntities.length > this.LIMIT) {
      navigation.nextPage = true;
      arrayOfEntities.pop;
    }
    if (skip && skip > 0) {
      navigation.previousPage = true;
    }

    return { navigation, result: arrayOfEntities };
  }
}
