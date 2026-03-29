import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './people.entity';
import { DataSource, DeepPartial, In, Repository } from 'typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { Planets } from 'src/planets/planets.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import { Starships } from 'src/starships/starship.entity';
import { Films } from 'src/films/films.entity';
import { Images } from 'src/images/images.entity';
import { Species } from 'src/species/species.entity';
import { FileService } from 'src/file/file.service';
import { join } from 'path';
import { rm } from 'fs/promises';
import { UpdatePeopleDto } from './dto/update-people.dto';

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

  async findById(id: string) {
    const person = await this.peopleRepository.findOne({
      where: { id: Number(id) },
      relations: { homeworld: true, vehicles: true, starships: true, images:true },
    });    
    const images = person?.images?.map(img => {
      const imgUrl = join(process.cwd(), 'upload', img.url)
      img.url = imgUrl
      return img  
    })
    return {...person, images}
  }

  async create(dto: CreatePeopleDto, images: Express.Multer.File[]) {
    const {
      img,
      homeworldId,
      filmsIds,
      starshipsIds,
      vehiclesIds,
      speciesIds,
      ...peopleDto
    } = dto;
    const homeworld = homeworldId;
    const films = filmsIds.map((film) =>
      this.filmsRepository.create({ id: film }),
    );
    const starships = starshipsIds.map((starship) =>
      this.starshipsRepository.create({ id: starship }),
    );
    const vehicles = vehiclesIds.map((vehicle) =>
      this.vehiclesRepository.create({ id: vehicle }),
    );
    const species = speciesIds.map((species) =>
      this.speciesRepository.create({ id: species }),
    );

    const newPerson = this.peopleRepository.create({
      ...peopleDto,
      homeworld,
      films,
      starships,
      vehicles,
      species,
    } as DeepPartial<People>);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const imgNames: string[] = [];
    const newImages: Images[] = [];
    try {
      await queryRunner.manager.save(newPerson);      
      for (const img of images) {
        const fileName = await this.fileService.saveFile(img);
        imgNames.push(fileName);
        const newImage = queryRunner.manager.create(Images, {
          url: fileName,
          people: newPerson,
        });
        newImages.push(newImage)
      }
      
      await queryRunner.manager.save(newImages);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error('An error occurred while adding new people entity ', error);
      await queryRunner.rollbackTransaction();
      const pathToFile = join(process.cwd(), 'upload');
      for (const img of imgNames) {
        await rm(join(pathToFile, img));
      }
    } finally {
      await queryRunner.release();
    }

    return newPerson;
  }

  async update(id: string, dto: UpdatePeopleDto, images: Express.Multer.File[]) {
    const person = this.findById(id)
    console.log(dto);
  }
}
