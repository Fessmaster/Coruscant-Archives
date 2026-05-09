import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { BasicService } from 'src/basic/basic.service';
import { FilmsEntity } from './entity/films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { CreateFilmsDto } from './dto/create-films.dto';
import { UpdateFilmsDto } from './dto/update-films.dto';
import { FILM_METADATA } from './common/film.metadata';

@Injectable()
export class FilmsService extends BasicService<FilmsEntity> {
  constructor(
    @InjectRepository(FilmsEntity)
    private readonly filmsRepository: Repository<FilmsEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService
  ){ super(filmsRepository, FILM_METADATA)}

    protected readonly logger = new Logger(FilmsService.name);
  
    async create(dto: CreateFilmsDto) {      
      const relationData = this.dataMapping(dto);                                                                  
      const record = this.filmsRepository.create({
        ...dto,        
        ...relationData,
      } as DeepPartial<FilmsEntity>);
  
      try {
        return await this.filmsRepository.save(record);
      } catch (error) {
        this.logger.error('An error occurred while saved record to DB', error);
        throw new InternalServerErrorException('An error occurred while saved record to DB')
      }
    }
  
  async addImages(id: string, images: Express.Multer.File[]) {
      const film = await this.findById(id)
      if (!film){
        throw new NotFoundException('Film not found')
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
        throw new InternalServerErrorException('An error occurred while saved images')
      }
    }
  
    async update(id: string, dto: UpdateFilmsDto) {
      const record = await this.findById(id);
      const validDto = Object.fromEntries(
        Object.entries(dto).filter(([key, val]) => val !== undefined),
      );
      const { charactersIds, planetsIds, vehiclesIds, starshipsIds, speciesIds, ...simpleData} = validDto
      const relationData = this.dataMapping(validDto);
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
          throw new InternalServerErrorException('An error occurred while saved updated data ')
        }
      }
      return updateData;
    }
  
    async deleteImg(id: string, imgId: string) {
    const record = await this.findById(id);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { films: true },
    });

    if (!record || !image) {
      throw new NotFoundException();
    }
    const isBelong = image.films.some(rec=> rec.id===record.id)       
    
    if (isBelong) {
      throw new NotFoundException('Image not belong this film');
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
