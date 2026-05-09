import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicService } from 'src/basic/basic.service';
import { StarshipsEntity } from './entity/starship.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { STARSHIPS_METADATA } from './common/starships.metadata';
import { CreateStarshipsDto } from './dto/create-starships.dto';
import { UpdateStarshipsDto } from './dto/update-starships.dto';

@Injectable()
export class StarshipService extends BasicService<StarshipsEntity> {
  constructor(
    @InjectRepository(StarshipsEntity)
    private readonly starshipRepository: Repository<StarshipsEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService,
  ) {
    super(starshipRepository, STARSHIPS_METADATA);
  }

  protected readonly logger = new Logger(StarshipService.name);

  async create(dto: CreateStarshipsDto) {
    const relationData = this.dataMapping(dto);
    const record = this.starshipRepository.create({
      ...dto,
      ...relationData,
    } as DeepPartial<StarshipsEntity>);

    try {
      return await this.starshipRepository.save(record);
    } catch (error) {
      this.logger.error('An error occurred while saved record to DB', error);
      throw new InternalServerErrorException(
        'An error occurred while saved record to DB',
      );
    }
  }

  async addImages(id: string, images: Express.Multer.File[]) {
    const record = await this.findById(id);
    if (!record) {
      throw new NotFoundException('Starship not found');
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
      record.images = [...record.images, ...newImages];
      await this.starshipRepository.save(record);
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

  async update(id: string, dto: UpdateStarshipsDto) {
    const record = await this.findById(id);

    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, pilotsIds, ...simpleData } = validDto;
    const relationData = this.dataMapping(validDto);
    const updateData = await this.starshipRepository.preload({
      id: Number(id),
      ...simpleData,
      ...relationData,
    });

    if (updateData) {
      try {
        await this.starshipRepository.save(updateData);
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
    const record = await this.findById(id);
    const image = await this.imagesRepository.findOne({
      where: { id: Number(imgId) },
      relations: { starships: true },
    });

    if (!record || !image) {
      throw new NotFoundException();
    }
    const isBelong = image.starships.some(rec=> rec.id===record.id)       
    
    if (isBelong) {
      throw new NotFoundException('Image not belong this starship');
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
