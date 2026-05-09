import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';
import {
  DeepPartial,
  Repository,
} from 'typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { BasicService } from 'src/basic/basic.service';
import { PEOPLE_METADATA } from './common/people.metadata';

@Injectable()
export class PeopleService extends BasicService<PeopleEntity> {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly peopleRepository: Repository<PeopleEntity>,    
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService    
  ) {
    super(peopleRepository, PEOPLE_METADATA);
  }

  protected readonly logger = new Logger(PeopleService.name);

  async create(dto: CreatePeopleDto) {
    const {
      homeworldId, 
      ...peopleDto
    } = dto;    
    const relationData = this.dataMapping(dto);
    const homeworld = homeworldId;                                                                           
    const record = this.peopleRepository.create({
      ...peopleDto,
      homeworld,
      ...relationData,
    } as DeepPartial<PeopleEntity>);

    try {
      return await this.peopleRepository.save(record);
    } catch (error) {
      this.logger.error('An error occurred while saved record to DB', error);
      throw new InternalServerErrorException('An error occurred while saved record to DB')
    }
  } 

  async addImages(id: string, images: Express.Multer.File[]) {
    const person = await this.findById(id)
    if (!person){
      throw new NotFoundException('Person not found')
    }
    const listOfImagesNames: string[] = [];
    const newImages: ImagesEntity[] = [];

    try {
      for (const img of images) {
        const fileName = await this.fileService.saveFile(img);
        listOfImagesNames.push(fileName);
        newImages.push(
          this.imagesRepository.create({            
            url: fileName,
          }),
        );
      }
      await this.imagesRepository.save(newImages);
      person.images = [... person.images, ...newImages]
      await this.peopleRepository.save(person)      
      return newImages
    } catch (error) {
      this.logger.error('An error occurred while saved images ', error);
      if (listOfImagesNames.length !== 0) {
        this.fileService.deleteFiles(listOfImagesNames);
      }
      throw new InternalServerErrorException('An error occurred while saved images')
    }
  }

  async update(id: string, dto: UpdatePeopleDto) {
    const record = await this.findById(id);
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, starshipsIds, vehiclesIds, speciesIds, ...simpleData} = validDto
    const relationData = this.dataMapping(validDto);
    const updateData = await this.peopleRepository.preload({
      id: Number(id),
      ...simpleData,
      ...relationData
    });

    if (updateData) {
      try {
        await this.peopleRepository.save(updateData);
      } catch (error) {
        this.logger.error('An error occurred while saved updated data ', error);
        throw new InternalServerErrorException('An error occurred while saved record to DB')
      }
    }
    return updateData;
  }

  async deleteImg(id: string, imgId: string) {
    const record = await this.findById(id);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { people: true },
    });

    if (!record || !image) {
      throw new NotFoundException();
    }
    const isBelong = image.people.some(rec=> rec.id===record.id)       
    
    if (!isBelong) {
      throw new NotFoundException('Image not belong this person');
    }
    try {
      const result = this.imagesRepository.remove(image);
      this.fileService.deleteFile(image.url);
      return result;
    } catch (error) {
      this.logger.error('An error occurred while deleting image');
      throw new InternalServerErrorException('An error occurred while deleting image')
    }
  }
}
