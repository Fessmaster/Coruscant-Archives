import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanetsEntity } from './entity/planets.entity';
import { DeepPartial, Repository } from 'typeorm';
import { BasicService } from 'src/basic/basic.service';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { PLANETS_METADATA } from './common/planets.metadata';
import { CreatePlanetsDto } from './dto/create-planets.dto';
import { UpdatePlanetsDto } from './dto/update-planets.dto';

@Injectable()
export class PlanetsService extends BasicService<PlanetsEntity> {
  constructor(
    @InjectRepository(PlanetsEntity)
    private readonly planetsRepository: Repository<PlanetsEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService,
  ) {
    super(planetsRepository, PLANETS_METADATA);
  }

  protected readonly logger = new Logger(PlanetsService.name);

  async create(dto: CreatePlanetsDto) {
    const relationData = this.dataMapping(dto);

    const record = this.planetsRepository.create({
      ...dto,
      ...relationData,
    } as DeepPartial<PlanetsEntity>);

    try {
      return await this.planetsRepository.save(record);
    } catch (error) {
      this.logger.error('An error occurred while saved record to DB', error);
      throw new InternalServerErrorException(
        'An error occurred while saved record to DB',
      );
    }
  }

  async addImages(id: string, images: Express.Multer.File[]) {
    const planet = await this.findById(id);
    if (!planet) {
      throw new NotFoundException('Planet not found');
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
      planet.images = [...planet.images, ...newImages];
      await this.planetsRepository.save(planet);
      return newImages;
    } catch (error) {
      this.logger.error('An error occurred while saved images ', error);
      if (listOfImagesNames.length !== 0) {
        this.fileService.deleteFiles(listOfImagesNames);
      }
      throw new InternalServerErrorException(
        'An error occurred while saved images',
      );
    }
  }

  async update(id: string, dto: UpdatePlanetsDto) {
    const record = await this.findById(id);
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, residentsIds, ...simpleData } =
      validDto;
    const relationData = this.dataMapping(validDto);
    const updateData = await this.planetsRepository.preload({
      id: Number(id),
      ...simpleData,
      ...relationData,
    });

    if (updateData) {
      try {
        await this.planetsRepository.save(updateData);
      } catch (error) {
        this.logger.error('An error occurred while saved updated data ', error);
        throw new InternalServerErrorException(
          'An error occurred while saved updated data',
        );
      }
    }
    return updateData;
  }

  async deleteImg(id: string, imgId: string) {
    const record = await this.findById(id);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { planets: true },
    });

    if (!record || !image) {
      throw new NotFoundException();
    }
    const isBelong = image.planets.some(rec=> rec.id===record.id)       
    
    if (isBelong) {
      throw new NotFoundException('Image not belong this planet');
    }
    try {
      const result = this.imagesRepository.remove(image);
      this.fileService.deleteFile(image.url);
      return result;
    } catch (error) {
      this.logger.error('An error occurred while deleting image');
      throw new InternalServerErrorException(
        'An error occurred while deleting image',
      );
    }
  }
}
