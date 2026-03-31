import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './people.entity';
import {
  DataSource,
  DeepPartial,
  In,
  PersistedEntityNotFoundError,
  Repository,
} from 'typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { Planets } from 'src/planets/planets.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import { Starships } from 'src/starships/starship.entity';
import { Films } from 'src/films/films.entity';
import { Images } from 'src/images/images.entity';
import { Species } from 'src/species/species.entity';
import { FileService } from 'src/file/file.service';
import { join } from 'path';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { MappingFields } from 'src/common/types/mapping-fields.interface';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private readonly peopleRepository: Repository<People>,
    @InjectRepository(Planets)
    private readonly planetsRepository: Repository<Planets>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Starships)
    private readonly starshipsRepository: Repository<Starships>,
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
    private readonly fileService: FileService,
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger(PeopleService.name);

  async findById(id: string) {
    const person = await this.peopleRepository.findOne({
      where: { id: Number(id) },
      relations: {
        homeworld: true,
        vehicles: true,
        starships: true,
        images: true,
      },
    });
    const images = person?.images?.map((img) => {
      const imgUrl = join(process.cwd(), 'upload', img.url);
      img.url = imgUrl;
      return img;
    });
    return { ...person, images };
  }

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

  async create(dto: CreatePeopleDto) {
    const {
      homeworldId, 
      ...peopleDto
    } = dto;
    const fieldList = ['filmsIds', 'starshipsIds', 'vehiclesIds', 'speciesIds'];
    const relationData = this.dataMapping(dto, fieldList);
    console.log(
      '===================================================================',
    );
    console.log(relationData);
    console.log(
      '===================================================================',
    );

    const homeworld = homeworldId;                                                                           
    const newPerson = this.peopleRepository.create({
      ...peopleDto,
      homeworld,
      ...relationData,
    } as DeepPartial<People>);

    try {
      return await this.peopleRepository.save(newPerson);
    } catch (error) {
      this.logger.error('An error occurred while saved person to DB', error);
    }
  }

  async addImages(id: string, images: Express.Multer.File[]) {
    const person = await this.findById(id);
    const listOfImagesNames: string[] = [];
    const newImages: Images[] = [];

    try {
      for (const img of images) {
        const fileName = await this.fileService.saveFile(img);
        listOfImagesNames.push(fileName);
        newImages.push(
          this.imagesRepository.create({
            people: person,
            url: fileName,
          }),
        );
      }
      return await this.imagesRepository.save(newImages);
    } catch (error) {
      this.logger.error('An error occurred while saved images ', error);
      if (listOfImagesNames.length !== 0) {
        this.fileService.deleteFiles(listOfImagesNames);
      }
    }
  }

  async update(id: string, dto: UpdatePeopleDto) {
    const fieldList = ['filmsIds', 'starshipsIds', 'vehiclesIds', 'speciesIds'];
    const validDto = Object.fromEntries(
      Object.entries(dto).filter(([key, val]) => val !== undefined),
    );
    const { filmsIds, starshipsIds, vehiclesIds, speciesIds, ...simpleData} = validDto
    const relationData = this.dataMapping(validDto, fieldList);
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

  async deletePerson(id: string) {
    const person = await this.findById(id);
    if (!person || !person.id) {
      throw new NotFoundException(`Person `);
    }
    try {
      return await this.peopleRepository.delete(person.id);
    } catch (error) {
      this.logger.error('An error occurred while deleted person ', error);
    }
  }

  async deleteImg(id: string, imgId: string) {
    const person = await this.findById(id);
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
