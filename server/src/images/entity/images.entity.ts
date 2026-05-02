import { BasicEntity } from 'src/basic/entity/basic.entity';
import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { PlanetsEntity } from 'src/planets/entity/planets.entity';
import { SpeciesEntity } from 'src/species/entity/species.entity';
import { StarshipsEntity } from 'src/starships/entity/starship.entity';
import { VehiclesEntity } from 'src/vehicles/entity/vehicles.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('images')
export class ImagesEntity extends BasicEntity {
  @Column({ type: 'varchar' })
  url: string;

  @ManyToMany(() => PeopleEntity, (people) => people.images)
  people: PeopleEntity;

  @ManyToMany(() => FilmsEntity, (films) => films.images)
  films: FilmsEntity;

  @ManyToMany(() => PlanetsEntity, (planets) => planets.images)
  planets: PlanetsEntity;

  @ManyToMany(() => SpeciesEntity, (species) => species.images)
  species: SpeciesEntity;

  @ManyToMany(() => StarshipsEntity, (starships) => starships.images)
  starships: StarshipsEntity;

  @ManyToMany(() => VehiclesEntity, (vehicles) => vehicles.images)
  vehicles: VehiclesEntity;
}
