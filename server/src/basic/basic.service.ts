import { Logger, NotFoundException } from '@nestjs/common';
import { IBasicEntity } from 'src/basic/interface/basic-entity.interface';
import {
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IMetadata } from './interface/metadata.interface';

export abstract class BasicService<T extends IBasicEntity> {
  protected readonly logger = new Logger(this.constructor.name);
  constructor(
    protected readonly basicRepository: Repository<T>,
    protected readonly metadata: IMetadata<T>,
  ) {}

  private readonly LIMIT = 20;
  private readonly imageUrl =
    'https://pub-9d68176ca7fb4da099c6ec57db92aae9.r2.dev/';

  dataMapping(obj) {
    const mappedData = {};
    for (const field of this.metadata.fieldList) {
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

  async findById(id: string) {
    const relationObject: Record<string, any> = {};
    relationObject['images'] = true;
    if (Array.isArray(this.metadata.relations)) {
      this.metadata.relations.forEach((rel) => {
        if (rel === 'images') {
          relationObject[rel] = true;
        } else {
          relationObject[rel] = {
            images: true,
          };
        }
      });
    }
    const entity = await this.basicRepository.findOne({
      where: { id: Number(id) } as unknown as FindOptionsWhere<T>,
      relations: relationObject,
    });

    if (!entity) {
      throw new NotFoundException(`Record width id: ${id} not exist`);
    }
    return entity;
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

  async getArrayOfEntities(skip: number, meta?: IMetadata<T>) {
    const navigation = {
      nextPage: false,
      previousPage: false,
    };
    const selectOption = meta?.fieldList
      ? (meta.fieldList as unknown as FindOptionsSelect<T>)
      : undefined;
    const relationOption = meta?.relations
      ? (meta.relations as unknown as FindOptionsRelations<T>)
      : undefined;
    const [arrayOfEntities, countEntities] =
      await this.basicRepository.findAndCount({
        select: selectOption,
        relations: relationOption,

        take: this.LIMIT + 1,
        skip: skip,
      });

    if (arrayOfEntities.length > this.LIMIT) {
      navigation.nextPage = true;
      arrayOfEntities.pop();
    }
    if (skip && skip > 0) {
      navigation.previousPage = true;
    }

    return { navigation, countEntities, result: arrayOfEntities };
  }
}
