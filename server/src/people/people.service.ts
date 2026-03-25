import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './people.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { PeopleDto } from './dto/people.dto';
import { extname, join } from 'path';
import { writeFile } from 'fs/promises';
import { Planets } from 'src/planets/planets.entity';
import { Vehicles } from 'src/vehicles/vehicles.entity';
import { Starships } from 'src/starships/starship.entity';
import { Films } from 'src/films/films.entity';
import { Images } from 'src/images/images.entity';
import { Species } from 'src/species/species.entity';

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
  ) {}

  findOne(id: string) {
    return this.peopleRepository.findOne({
      where: { id: Number(id) },
      relations: { homeworld: true, vehicles: true, starships: true },
    });
  }

  async create(dto: PeopleDto, images: Express.Multer.File[]) {
    const {
      img,
      homeworldId,
      filmsIds,
      starshipsIds,
      vehiclesIds,
      speciesIds,
      ...peopleDto
    } = dto;
    const homeworld = await this.planetsRepository.findOne({
      select: { id: true },
      where: { id: homeworldId },
    });
    console.log('FILMS - ', filmsIds, typeof filmsIds);
    const films = await this.filmsRepository.find({
      select: { id: true },
      where: { id: In(filmsIds) },
    });
    const starships = await this.starshipsRepository.find({
      select: { id: true },
      where: { id: In(starshipsIds) },
    });
    const vehicles = await this.vehiclesRepository.find({
      select: { id: true },
      where: { id: In(vehiclesIds) },
    });
    const species = await this.speciesRepository.find({
      select: { id: true },
      where: { id: In(speciesIds) },
    });
    const newPerson = this.peopleRepository.create({
      ...peopleDto,
      homeworld,
      films,
      starships,
      vehicles,
      species,
    } as DeepPartial<People>);

    await this.peopleRepository.save(newPerson)

    for (const img of images) {
      const fileName = `${Date.now() + Math.round(Math.random() * 1e9)}${extname(img.originalname)}`;
      const filePath = join(process.cwd(), 'upload', fileName);
      //TODO Додати перевірку існування каталога 'upload'!
      //TODO Розглянути застосування транзакцій
      //TODO Видаляти зображення у разі невдалого запису

      try {
        await writeFile(filePath, img.buffer);
        const newImg = this.imagesRepository.create({ url: filePath, people: newPerson })
        await this.imagesRepository.save(newImg);
      } catch (error) {
        console.log(`Catch error while added new record: `, error);
      }
    }
    return newPerson;
  }
}
