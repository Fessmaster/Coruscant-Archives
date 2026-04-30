import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BasicService } from 'src/basic/basic.service';
import { FilmsEntity } from './entity/films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { CreateFilmsDto } from './dto/create-films.dto';
import { UpdateFilmsDto } from './dto/update-films.dto';

@Injectable()
export class FilmsService extends BasicService<FilmsEntity> {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService
  ){ super(filmsRepository)}

    protected readonly logger = new Logger(FilmsService.name);
    private readonly fieldList = ['charactersIds', 'planetsIds', 'vehiclesIds', 'speciesIds'];
  
    async create(dto: CreateFilmsDto) {      
      const relationData = this.dataMapping(dto, this.fieldList);                                                                  
      const newPerson = this.filmsRepository.create({
        ...dto,        
        ...relationData,
      } as DeepPartial<FilmsEntity>);
  
      try {
        return await this.filmsRepository.save(newPerson);
      } catch (error) {
        this.logger.error('An error occurred while saved person to DB', error);
      }
    }
  
  async addImages(id: string, images: Express.Multer.File[]) {
      const film = await this.findById(id, ['images'])
      if (!film){
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
        film.images = [... film.images, ...newImages]
        await this.filmsRepository.save(film)      
        return newImages
      } catch (error) {
        this.logger.error('An error occurred while saved images ', error);
        if (listOfImagesNames.length !== 0) {
          this.fileService.deleteFiles(listOfImagesNames);
        }
      }
    }
  
    async update(id: string, dto: UpdateFilmsDto) {
      const validDto = Object.fromEntries(
        Object.entries(dto).filter(([key, val]) => val !== undefined),
      );
      const { charactersIds, planetsIds, vehiclesIds, speciesIds, ...simpleData} = validDto
      const relationData = this.dataMapping(validDto, this.fieldList);
      const updateData = await this.filmsRepository.preload({
        id: Number(id),
        ...simpleData,
        ...relationData
      });
  
      if (updateData) {
        try {
          await this.filmsRepository.save(updateData);
        } catch (error) {
          this.logger.error('An error occurred while saved updated data ', error);
        }
      }
      return updateData;
    }
  
    async deleteImg(id: string, imgId: string) {
      const film = await this.findById(id, ['images']);
      const image = await this.imagesRepository.findOne({
        where: { id: Number(imgId) },
        relations: { people: true },
      });
  
      if (!film || !image) {
        throw new NotFoundException();
      }
  
      if (film.id !== image.films.id) {
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
