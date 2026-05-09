import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicService } from 'src/basic/basic.service';
import { VehiclesEntity } from './entity/vehicles.entity';
import { DeepPartial, Repository } from 'typeorm';
import { VEHICLES_METADATA } from './common/vehicles.metadata';
import { ImagesEntity } from 'src/images/entity/images.entity';
import { FileService } from 'src/file/file.service';
import { CreateVehiclesDto } from './dto/create-vehicles.dto';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';

@Injectable()
export class VehiclesService extends BasicService<VehiclesEntity> {
  constructor(
    @InjectRepository(VehiclesEntity)
    private readonly vehiclesRepository: Repository<VehiclesEntity>,
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
    private readonly fileService: FileService,
  ) {
    super(vehiclesRepository, VEHICLES_METADATA);
  }

  protected readonly logger = new Logger(VehiclesService.name);

  async create(dto: CreateVehiclesDto) {
    const relationData = this.dataMapping(dto);
    const record = this.vehiclesRepository.create({
      ...dto,
      ...relationData,
    } as DeepPartial<VehiclesEntity>);

    try {
      return await this.vehiclesRepository.save(record);
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
      throw new NotFoundException('Vehicle not found');
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
      await this.vehiclesRepository.save(record);
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

  async update(id: string, dto: UpdateVehiclesDto) {
    const record = await this.findById(id);
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, pilotsIds, ...simpleData } = validDto;
    const relationData = this.dataMapping(validDto);
    const updateData = await this.vehiclesRepository.preload({
      id: Number(id),
      ...simpleData,
      ...relationData,
    });

    if (updateData) {
      try {
        await this.vehiclesRepository.save(updateData);
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
      relations: { vehicles: true },
    });

    if (!record || !image) {
      throw new NotFoundException();
    }
    const isBelong = image.vehicles.some((rec) => rec.id === record.id);

    if (isBelong) {
      throw new NotFoundException('Image not belong this vehicles');
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
