import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicService } from 'src/basic/basic.service';
import { SpeciesEntity } from './entity/species.entity';
import { DeepPartial, Repository } from 'typeorm';
import { SPECIES_METADATA } from './common/species.metadata';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Injectable()
export class SpeciesService extends BasicService<SpeciesEntity> {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService,
  ) {
    super(speciesRepository, SPECIES_METADATA);
  }

  protected readonly logger = new Logger(SpeciesService.name);

  async create(dto: CreateSpeciesDto) {
    const { homeworldId, ...speciesDto } = dto;
    const relationData = this.dataMapping(dto);
    const homeworld = homeworldId;
    const record = this.speciesRepository.create({
      ...speciesDto,
      homeworld,
      ...relationData,
    } as DeepPartial<SpeciesEntity>);

    try {
      return await this.speciesRepository.save(record);
    } catch (error) {
      this.logger.error('An error occurred while saved record to DB', error);
      throw new InternalServerErrorException(
        'An error occurred while saved record to DB',
      );
    }
  }

  async addImages(id: string, images: Express.Multer.File[]) {
    const species = await this.findById(id);
    if (!species) {
      throw new NotFoundException('Species not found');
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
      species.images = [...species.images, ...newImages];
      await this.speciesRepository.save(species);
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

  async update(id: string, dto: UpdateSpeciesDto) {
    const record = await this.findById(id);
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, peopleIds, ...simpleData } =
      validDto;
    const relationData = this.dataMapping(validDto);
    const updateData = await this.speciesRepository.preload({
      id: Number(id),
      ...simpleData,
      ...relationData,
    });

    if (updateData) {
      try {
        await this.speciesRepository.save(updateData);
      } catch (error) {
        this.logger.error('An error occurred while saved updated data ', error);
        throw new InternalServerErrorException(
          'An error occurred while saved record to DB',
        );
      }
    }
    return updateData;
  }

  async deleteImg(id: string, imgId: string) {
    const species = await this.findById(id);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { people: true },
    });

    if (!species || !image) {
      throw new NotFoundException();
    }

    if (species.id !== image.people.id) {
      throw new NotFoundException('Image not belong this species');
    }
    try {
      const result = this.imagesRepository.delete(image.id);
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
