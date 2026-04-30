import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class PeopleService extends BasicService<PeopleEntity> {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly peopleRepository: Repository<PeopleEntity>,    
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService    
  ) {
    super(peopleRepository);
  }

  protected readonly logger = new Logger(PeopleService.name);
  private readonly fieldList = ['filmsIds', 'starshipsIds', 'vehiclesIds', 'speciesIds'];

  async create(dto: CreatePeopleDto) {
    const {
      homeworldId, 
      ...peopleDto
    } = dto;    
    const relationData = this.dataMapping(dto, this.fieldList);
    const homeworld = homeworldId;                                                                           
    const newPerson = this.peopleRepository.create({
      ...peopleDto,
      homeworld,
      ...relationData,
    } as DeepPartial<PeopleEntity>);

    try {
      return await this.peopleRepository.save(newPerson);
    } catch (error) {
      this.logger.error('An error occurred while saved person to DB', error);
    }
  } 

  async addImages(id: string, images: Express.Multer.File[]) {
    const person = await this.findById(id, ['homeworld', 'vehicles', 'starships', 'images'])
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
    }
  }

  async update(id: string, dto: UpdatePeopleDto) {
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, starshipsIds, vehiclesIds, speciesIds, ...simpleData} = validDto
    const relationData = this.dataMapping(validDto, this.fieldList);
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
      }
    }
    return updateData;
  }

  // {        
  //       homeworld: true,
  //       vehicles: true,
  //       starships: true,
  //       images: true,
  //     }

  async deleteImg(id: string, imgId: string) {
    const person = await this.findById(id, ['homeworld', 'vehicles', 'starships', 'images']);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { people: true },
    });

    if (!person || !image) {
      throw new NotFoundException();
    }

    if (person.id !== image.people.id) {
      throw new NotFoundException('Image not belong this person');
    }
    try {
      const result = this.imagesRepository.delete(image.id);
      this.fileService.deleteFile(image.url);
      return result;
    } catch (error) {
      this.logger.error('An error occurred while deleting image');
    }
  }
}
